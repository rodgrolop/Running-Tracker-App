import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import { calcDistance, filterCoords } from './tracking.helpers'
import AsyncStorage from '@react-native-community/async-storage'
import pick from 'lodash/pick'
import last from 'lodash/last'

import { setStartPosition, startTracking, stopTracking, updateTrackingState, trackingHasEnded } from '../actions/tracking.actions'

import store from '../store'

const TASK_FETCH_LOCATION = 'TASK_FETCH_LOCATION'

TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data: { locations }, error }) => {
    
    const [ location ] = locations
    
    if (error || !location.coords) {
        error && console.log(error)
        return
    }
    
    const { tracking } = store.getState()
    const { user } = store.getState()
    
    let currentStepDistance = calcDistance(tracking.lastLocation, location)
    // TODO this can be const?
    const currentRunInstantSpeed = (tracking.lastTimeStamp != 0) ? ((currentStepDistance / ((location.timestamp - tracking.lastTimeStamp) / 1000)) * 3.6) : 0
    const normalizedStep = (currentRunInstantSpeed > 30) ? 0 : currentStepDistance
    const newCoordinates = tracking.routeCoordinates.concat(pick(location.coords, ['latitude', 'longitude']))
    const newFilteredCoordinates = filterCoords(newCoordinates)

    
    if (location.accuracy > 5) {
        // TODO check wether reassingn let
    }
        
    const updatedObject = {     
        routeCoordinates: newCoordinates,
        filteredRouteCoordinates: newFilteredCoordinates,
        location: location,
        lastLocation: tracking.location,
        timeStamp: location.timestamp,
        lastTimeStamp: tracking.timeStamp,
        currentRunTimeSpent: (location.timestamp > tracking.runStartingTime) ? (location.timestamp - tracking.runStartingTime) : 0,
        currentRunDistance: tracking.currentRunDistance + normalizedStep,
        currentRunInstantSpeed: currentRunInstantSpeed,
    }
      
    store.dispatch(updateTrackingState(updatedObject)) 
    
    if (updatedObject.currentRunDistance >= user.distance){
        stopBackgroundLocationService()
        store.dispatch(trackingHasEnded())
        return
    }  
       
})

const recordStartTime = async (time) => {
    try {
        await AsyncStorage.setItem("@start_time", time.toString())
    } catch (err) {
        console.warn(err)
    }
}

export const getLastKnownPosition = async () => {
  
    const options = {
        maxAge: 300000,
        requiredAccuracy: 5,
    }
    
    const lastKnownPosition = await Location.getLastKnownPositionAsync(options)
    
    lastKnownPosition ? store.dispatch(setStartPosition(lastKnownPosition)) : getCurrentPosition()
    
}

export const getCurrentPosition = async () => {
  
    const currentPosition = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest })
    
    currentPosition ? store.dispatch(setStartPosition(currentPosition)) : console.log('No current position available')
    
} 

export const startBackgroundLocationService = async () => {
    const currentPosition = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest })
    
    if (currentPosition) {
        store.dispatch(startTracking(currentPosition))
        recordStartTime(currentPosition.timestamp)
        startBackgroundService()
    } else {
        console.log('No current position available')
    }
}

export const startBackgroundService = () => {    
    Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
        accuracy: 5,
        distanceInterval: 1, // minimum change (in meters) betweens updates
        timeInterval : 1000,
        deferredUpdatesInterval: 1000, // minimum interval (in milliseconds) between updates
        activityType : 3,
        pausesUpdatesAutomatically: true,
        // foregroundService is how you get the task to be updated as often as would be if the app was open
        foregroundService: {
            notificationTitle: 'San Silvestre Valladolid',
            notificationBody: 'Está accediendo a tu ubicación en segundo plano.',
            notificationColor: '#63257F',
        },
      })
}

export const stopBackgroundLocationService = async () => {
    
    store.dispatch(stopTracking())
    const isTracking = await Location.hasStartedLocationUpdatesAsync(TASK_FETCH_LOCATION)
    
    if (isTracking) { 
        Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION) 
    }
        
}
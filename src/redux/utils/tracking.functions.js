import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import { calcDistance, filterCoords } from './tracking.helpers'
import pick from 'lodash/pick'

import { setStartPosition, startTracking, pauseTracking, stopTracking, updateTrackingState } from '../actions/tracking.actions'

import store from '../store'

const TASK_FETCH_LOCATION = 'TASK_FETCH_LOCATION'

TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data: { locations }, error }) => {
    
    const [ location ] = locations
    
    if (error || !location.coords) {
        return
    }
    
    const { tracking } = store.getState()
    const currentStepDistance = calcDistance(tracking.lastLocation, location)
    const newCoordinates = tracking.routeCoordinates.concat(pick(location.coords, ['latitude', 'longitude']))
    const newFilteredCoordinates = filterCoords(newCoordinates)
    
    console.log(newFilteredCoordinates)
        
    const updatedObject = {        
        routeCoordinates: newCoordinates,
        filteredRouteCoordinates: newFilteredCoordinates,
        location: location,
        lastLocation: tracking.location,
        currentRunDistance: tracking.currentRunDistance + currentStepDistance, // TODO calcular la distancia con Haversine
    }
    
    store.dispatch(updateTrackingState(updatedObject)) 
       
})

// export const getLastKnownPosition = async () => {
  
//     const options = {
//         maxAge: 300000,
//         requiredAccuracy: 5,
//     }
    
//     const lastKnownPosition = await Location.getLastKnownPositionAsync(options)
    
//     lastKnownPosition ? store.dispatch(setStartPosition(lastKnownPosition)) : getCurrentPosition()
    
// }

// export const getCurrentPosition = async () => {
  
//     const currentPosition = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
    
//     currentPosition ? store.dispatch(setStartPosition(currentPosition)) : console.log('No current position available')
    
// } 

export const startBackgroundLocationService = () => {
    
    store.dispatch(startTracking()) 
      
    Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
        accuracy: 5,
        distanceInterval: 1, // minimum change (in meters) betweens updates
        timeInterval : 3000,
        deferredUpdatesInterval: 3000, // minimum interval (in milliseconds) between updates
        activityType : 3,
        pausesUpdatesAutomatically: true,
        // foregroundService is how you get the task to be updated as often as would be if the app was open
        foregroundService: {
            notificationTitle: 'San Silvestre Valladolid',
            notificationBody: 'Está accediendo a tu ubicación en segundo plano.',
        },
    })
}

export const pauseBackgroundLocationService = async () => {
    
    const isTracking = await Location.hasStartedLocationUpdatesAsync(TASK_FETCH_LOCATION)
    
    if (isTracking) {
        Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION)
    }
        
    store.dispatch(pauseTracking())
        
}

export const stopBackgroundLocationService = async () => {
    
    const isTracking = await Location.hasStartedLocationUpdatesAsync(TASK_FETCH_LOCATION)
    
    if (isTracking) { 
        Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION)
    }
    
    store.dispatch(stopTracking())
        
}
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import pick from 'lodash/pick'

import { setStartPosition, updateCoordinates } from '../actions/tracking.actions'

import store from '../store'

const TASK_FETCH_LOCATION = 'TASK_FETCH_LOCATION'

TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data: { locations }, error }) => {
    
    const [location] = locations
    
    if (error || !location.coords) {
        return
    }
        
    const locationObj = {
        positionLatLngs: pick(location.coords, ['latitude', 'longitude']),
        location: location,
    }
    
    store.dispatch(updateCoordinates(locationObj)) 
       
})

export const getLastKnownPosition = async () => {
  
    const options = {
        maxAge: 300000,
        requiredAccuracy: 5,
    }
    
    const lastKnownPosition = await Location.getLastKnownPositionAsync(options)
    
    lastKnownPosition ? store.dispatch(setStartPosition(lastKnownPosition)) : getCurrentPosition()
    
}

export const getCurrentPosition = async () => {
  
    const currentPosition = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
    
    currentPosition ? store.dispatch(setStartPosition(currentPosition)) : console.log('No current position available')
    
} 

export const startBackgroundLocationService = () => {
      
    Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
        accuracy: 5,
        distanceInterval: 1, // minimum change (in meters) betweens updates
        timeInterval : 3000,
        deferredUpdatesInterval: 3000, // minimum interval (in milliseconds) between updates
        activityType : 3,
        pausesUpdatesAutomatically: true,
        // foregroundService is how you get the task to be updated as often as would be if the app was open
        foregroundService: {
            notificationTitle: 'Pucela Run Info',
            notificationBody: 'Pucela Run está accediendo a tu ubicación',
        },
    })
}

export const stopBackgroundLocationService = () => {
  
    Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION)
    
}
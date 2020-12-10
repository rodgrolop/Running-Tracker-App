import haversine from 'haversine'
import { KalmanFilter } from 'kalman-filter'

const kFilter = new KalmanFilter({observation: 2})

export const calcDistance = (lastLocation, currentlocation) => {
    
    if (lastLocation && currentlocation){
        
        return haversine(lastLocation.coords, currentlocation.coords)
        
    } else {
        
        return 0
        
    }
    
}

export const filterCoords = route => {
    
    if (route.length){
        
        const observations = Array.from(route, item => [item.longitude, item.latitude])
        
        const filteredRouteArray = kFilter.filterAll(observations)
        
        return Array.from(filteredRouteArray, item => ({'longitude': item[0] ,'latitude': item[1]}))
        
    } else {
        
        return []
        
    }
    
}
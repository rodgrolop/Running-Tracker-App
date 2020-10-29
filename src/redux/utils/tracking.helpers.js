import haversine from 'haversine'

export const calcDistance = (lastLocation, currentlocation) => haversine(lastLocation, currentlocation) || 0
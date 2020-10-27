export const SET_START_POSITION = 'SET_START_POSITION'
export const UPDATE_REGION = 'UPDATE_REGION'
export const UPDATE_COORDINATES = 'UPDATE_COORDINATES'

export const setStartPosition = location => ({
    type: SET_START_POSITION,
    payload: location,
})

export const updateRegion = region => ({
    type: UPDATE_REGION,
    payload: region,
})

export const updateCoordinates = location => ({
    type: UPDATE_COORDINATES,
    payload: location,
})

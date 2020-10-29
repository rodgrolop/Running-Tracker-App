export const SET_START_POSITION = 'SET_START_POSITION'
export const UPDATE_TRACKING_STATE = 'UPDATE_COORDINATES'

export const setStartPosition = location => ({
    type: SET_START_POSITION,
    payload: location,
})

export const updateTrackingState = location => ({
    type: UPDATE_TRACKING_STATE,
    payload: location,
})

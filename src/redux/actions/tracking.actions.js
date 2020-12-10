export const SET_START_POSITION = 'SET_START_POSITION'
export const START_TRACKING = 'START_TRACKING'
export const PAUSE_TRACKING = 'PAUSE_TRACKING'
export const STOP_TRACKING = 'STOP_TRACKING'
export const UPDATE_TRACKING_STATE = 'UPDATE_COORDINATES'

export const setStartPosition = location => ({
    type: SET_START_POSITION,
    payload: location,
})

export const startTracking = () => ({
    type: START_TRACKING,
    payload: null,
})

export const pauseTracking = () => ({
    type: PAUSE_TRACKING,
    payload: null,
})

export const stopTracking = () => ({
    type: STOP_TRACKING,
    payload: null,
})

export const updateTrackingState = location => ({
    type: UPDATE_TRACKING_STATE,
    payload: location,
})

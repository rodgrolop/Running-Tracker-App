export const SET_START_POSITION = 'SET_START_POSITION'
export const START_TRACKING = 'START_TRACKING'
export const CONTINUE_TRACKING = 'CONTINUE_TRACKING'
export const STOP_TRACKING = 'STOP_TRACKING'
export const UPDATE_TRACKING_STATE = 'UPDATE_COORDINATES'
export const TRACKING_HAS_ENDED = 'TRACKING_HAS_ENDED'
export const NOTIFIED = 'NOTIFIED'

export const setStartPosition = location => ({
    type: SET_START_POSITION,
    payload: location,
})

export const startTracking = time => ({
    type: START_TRACKING,
    payload: time,
})

export const continueTracking = () => ({
    type: CONTINUE_TRACKING,
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

export const trackingHasEnded = () => ({
    type: TRACKING_HAS_ENDED,
    payload: null,
})

export const notified = () => ({
    type: NOTIFIED,
    payload: null,
})

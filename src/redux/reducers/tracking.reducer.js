import { SET_START_POSITION, START_TRACKING, CONTINUE_TRACKING, STOP_TRACKING, UPDATE_REGION, UPDATE_TRACKING_STATE, TRACKING_HAS_ENDED, NOTIFIED } from '../actions/tracking.actions'

export const trackingInitialState = {
    region: {
        latitude: 41.6526595,
        longitude: -4.7234255,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    },
    initialRegion: {
        latitude: 41.6526595,
        longitude: -4.7234255,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    },
    location: {
        coords: {
            latitude: 41.6526595,
            longitude: -4.7234255,
        }
    },
    routeCoordinates: [],
    filteredRouteCoordinates: [],
    lastLocation: null,
    runAltitudes: [],
    runSpeeds: [],
    runStartingTime: null,
    runStatus: 'stopped',
    currentRunInstantSpeed: 0,
    currentRunTimeSpent: 0,
    currentRunDistance: 0,
    timeStamp: 0,
    lastTimeStamp: 0,
    lastRun: {},
    ended: false,
    endNotified: false,
}

const trackingReducer = (state = trackingInitialState, action) => {
    switch (action.type) {
        case SET_START_POSITION: {
            return {
                ...state,
                region: { ...state.region, ...action.payload.coords },
                location: action.payload,
            }
        }        
        case START_TRACKING: {
            return {
                ...state,
                routeCoordinates: [],
                filteredRouteCoordinates: [],
                currentRunTimeSpent: 0,
                currentRunDistance: 0,
                runStartingTime: action.payload,
                runStatus: 'started',
                lastTimeStamp: 0,
                ended: false,
                endNotified: false,
            }
        }
        case CONTINUE_TRACKING: {
            return {
                ...state,
                runStatus: 'started',
            }
        }
        case STOP_TRACKING: {
            return {
                ...state,
                runStartingTime: null,
                runStatus: 'stopped',
            }
        }
        case UPDATE_REGION: {
            return {
                ...state,
                region: action.payload,
            }
        }
        case UPDATE_TRACKING_STATE: {
            return {
                ...state,
                region: { ...state.region, ...action.payload.location.coords },
                location: action.payload.location,
                routeCoordinates: action.payload.routeCoordinates,
                filteredRouteCoordinates: action.payload.filteredRouteCoordinates,
                lastLocation: action.payload.lastLocation,
                currentRunTimeSpent: action.payload.currentRunTimeSpent,
                currentRunDistance: action.payload.currentRunDistance,
                timeStamp: action.payload.timeStamp,
                lastTimeStamp: action.payload.lastTimeStamp,
                currentRunInstantSpeed: action.payload.currentRunInstantSpeed,
            }
        }
        case TRACKING_HAS_ENDED: {
            return {
                ...state,
                ended: true,
                endNotified: false,
            }
        }
        case NOTIFIED: {
            return {
                ...state,
                ended: true,
                endNotified: true,
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default trackingReducer
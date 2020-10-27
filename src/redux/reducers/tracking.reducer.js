import { SET_START_POSITION, UPDATE_REGION, UPDATE_COORDINATES } from '../actions/tracking.actions'

const initialState = {
    region: {
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
}

const trackingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_START_POSITION: {
            return {
                ...state,
                region: { ...state.region, ...action.payload.coords },
                location: action.payload,
            }
        }
        case UPDATE_REGION: {
            return {
                ...state,
                region: action.payload,
            }
        }
        case UPDATE_COORDINATES: {
            return {
                ...state,
                region: { ...state.region, ...action.payload.location.coords },
                location: action.payload.location,
                routeCoordinates: state.routeCoordinates.concat(action.payload.positionLatLngs),
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
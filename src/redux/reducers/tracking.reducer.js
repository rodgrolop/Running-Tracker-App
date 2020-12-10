import { SET_START_POSITION, START_TRACKING, PAUSE_TRACKING, STOP_TRACKING, UPDATE_REGION, UPDATE_TRACKING_STATE } from '../actions/tracking.actions'

export const trackingInitialState = {
    // region: {
    //     latitude: 41.6526595,
    //     longitude: -4.7234255,
    //     latitudeDelta: 0.01,
    //     longitudeDelta: 0.01,
    // },
    region: {
        latitude: 33.8174037,
        longitude: -118.1337042,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    },
    location: {
        coords: {
            latitude: 33.8174037,
            longitude: -118.1337042,
        }
    },
    // routeCoordinates: [],
    routeCoordinates: [
        {"longitude":-118.1337042,"latitude":33.8174037},
        {"longitude":-118.1326528,"latitude":33.8177335},
        {"longitude":-118.1327493,"latitude":33.8174483},
        {"longitude":-118.1324489,"latitude":33.8176176},
        {"longitude":-118.1324596,"latitude":33.8174037},
        {"longitude":-118.1321378,"latitude":33.8176622},
        {"longitude":-118.1321485,"latitude":33.8171452},
        {"longitude":-118.1317086,"latitude":33.8174839},
        {"longitude":-118.1316442,"latitude":33.8172433},
        {"longitude":-118.1313224,"latitude":33.8174037},
        {"longitude":-118.1308396,"latitude":33.8174661},
        {"longitude":-118.1306357,"latitude":33.8173324},
        {"longitude":-118.1298633,"latitude":33.8175642},
        {"longitude":-118.1292088,"latitude":33.8175018},
        {"longitude":-118.1284041,"latitude":33.8173057},
        {"longitude":-118.1266017,"latitude":33.8174483},
        {"longitude":-118.1258292,"latitude":33.8177513},
        {"longitude":-118.1250567,"latitude":33.8173681},
        {"longitude":-118.1227715,"latitude":33.817475},
        {"longitude":-118.1218381,"latitude":33.8180722},
        {"longitude":-118.121763,"latitude":33.8173681},
        {"longitude":-118.1222565,"latitude":33.8166282},
        {"longitude":-118.1235976,"latitude":33.816655},
        {"longitude":-118.1251426,"latitude":33.8153179},
        {"longitude":-118.1267304,"latitude":33.8149881},
        {"longitude":-118.1285221,"latitude":33.8152822},
        {"longitude":-118.1292732,"latitude":33.8155675},
        {"longitude":-118.1288011,"latitude":33.8151218},
        {"longitude":-118.1289084,"latitude":33.81489},
        {"longitude":-118.1290479,"latitude":33.8150594},
        {"longitude":-118.1291981,"latitude":33.8152733},
        {"longitude":-118.1295414,"latitude":33.8151574},
        {"longitude":-118.1292088,"latitude":33.814997},
        {"longitude":-118.1291337,"latitude":33.8147563},
        {"longitude":-118.1294556,"latitude":33.8147741},
        {"longitude":-118.1296487,"latitude":33.815095},
        {"longitude":-118.1305392,"latitude":33.8155407},
        {"longitude":-118.1315155,"latitude":33.815309},
        {"longitude":-118.1323309,"latitude":33.8153625},
        {"longitude":-118.1330068,"latitude":33.8158171},
        {"longitude":-118.1335432,"latitude":33.815202},
        {"longitude":-118.1321163,"latitude":33.8161201},
        {"longitude":-118.1316764,"latitude":33.8165658},
        ],
    filteredRouteCoordinates: [],
    lastLocation: null,
    runAltitudes: [],
    runSpeeds: [],
    runStartingTimes: [],
    runStatus: 'stopped',
    currentRunInstantSpeed: 0,
    currentRunTimeSpent: 0,
    currentRunDistance: 0,
    lastRun: {},    
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
                runStatus: 'started',
            }
        }
        case PAUSE_TRACKING: {
            return {
                ...state,
                runStatus: 'paused',
            }
        }
        case STOP_TRACKING: {
            return {
                ...state,
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
                // routeCoordinates: action.payload.routeCoordinates,
                filteredRouteCoordinates: action.payload.filteredRouteCoordinates,
                lastLocation: action.payload.lastLocation,
                currentRunDistance: action.payload.currentRunDistance,
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
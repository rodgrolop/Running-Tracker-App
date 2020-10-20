import { GET_START_POSITION } from '../actions/tracking.actions'

const initialState = {
    location: {},
}

const trackingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_START_POSITION: {
            return {
                ...state,
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
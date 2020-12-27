import { SET_USER, USER_LOGOUT, LOADING } from '../actions/user.actions'
import { distance } from './../utils/helperFunctions';

export const userInitialState = {
    loading: false,
    isLoggedIn: false,
    error: '',
    user: {},    
    distance: null,
}

const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                isLoggedIn: true,
                loading: false,
                user: action.payload,
                distance: distance(action.payload.data.fec_nac)
            }
        }
        case USER_LOGOUT: {
            return {
                ...state
            }
        }
        case LOADING: {
            return {
                ...state,
                loading: action.payload,                
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default userReducer
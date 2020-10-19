import { USER_LOGIN, SET_USER, USER_LOGOUT, LOADING } from '../actions/user.actions'

const initialState = {
    loading: false,
    isLoggedIn: false,
    error: '',
    user: {},
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN: {
            return {
                ...state,
            }
        }
        case SET_USER: {
            return {
                ...state,
                isLoggedIn: true,
                loading: false,
                user: action.payload,
            }
        }
        case USER_LOGOUT: {
            return {
                ...initialState
            }
        }
        case LOADING: {
            return {
                ...state,
                loading: action.payload.loading,                
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
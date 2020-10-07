import { USER_LOGIN, USER_LOGOUT, LOADING } from '../actions/user.actions'

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
                isLoggedIn: true,
                user: action.payload.data,
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
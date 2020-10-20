import { combineReducers } from 'redux'
import applicationReducer from './application.reducer'
import userReducer from './user.reducer'
import trackingReducer from './tracking.reducer'

export default combineReducers({
    application: applicationReducer,
    user: userReducer,
    tracking: trackingReducer,
})
import { SET_USER, LOADING, USER_LOGOUT } from '../../actions/user.actions'
import * as RootNavigation from '../../../navigation/RootNavigation'

const userMiddleware = () => next => action => {  
  
  if (action.type === SET_USER) {
    next(action)
  }
  
  if (action.type === LOADING) {
    next(action)
  }
  
  if (action.type === USER_LOGOUT) {
    RootNavigation.navigate('Login')
    next(action)
  }
  
  else {
    next(action)
  }
}


export default userMiddleware
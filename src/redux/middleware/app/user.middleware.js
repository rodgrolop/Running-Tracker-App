import { USER_LOGIN, LOADING, setLoading } from '../../actions/user.actions'
import { loginUser } from '../../api/userApi';
import * as RootNavigation from '../../../navigation/RootNavigation'

const userMiddleware = store => next => action => {  
  
  if (action.type === USER_LOGIN) {   
    
    store.dispatch(setLoading(true))
    
    const loginResponse = loginUser(action.payload) 
    console.log(loginResponse)
    if (loginResponse == null) {      
      
        next(action) // continue with the login

        setTimeout(() => { // wait a moment before triggering the navigation
            // RootNavigation.navigate('Home')
        }, 2000)
    }
  }
  
  if (action.type === LOADING) {
        next(action) // continue with the login
  }
}



export default userMiddleware
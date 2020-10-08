import { USER_LOGIN, LOADING, setLoading } from '../../actions/user.actions'
import { loginUser } from '../../api/userApi';
import * as RootNavigation from '../../../navigation/RootNavigation'


// Temp


import axios from 'axios'


// const userMiddleware = store => next => action => {  
  
//   if (action.type === USER_LOGIN) {   
    
//     store.dispatch(setLoading(true))
    
//     const loginResponse = loginUser(action.payload) 
//     console.log(loginResponse)
//     if (loginResponse == null) {      
      
//         next(action) // continue with the login

//         setTimeout(() => { // wait a moment before triggering the navigation
//             // RootNavigation.navigate('Home')
//         }, 2000)
//     }
//   }
  
//   if (action.type === LOADING) {
//         next(action) // continue with the login
//   }
// }

const userMiddleware = store => next => action => {  
  
  if (action.type === USER_LOGIN) {   
    
    store.dispatch(setLoading(true))
    
    const apiHost = 'https://pucelarun.es/wp-json'
  
    let formData = new FormData();
    
    formData.append('username', action.payload.username)
    formData.append('password', action.payload.password)
  
    axios.post( apiHost + '/jwt-auth/v1/token', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(responseJson => {
      store.dispatch(setLoading(false))
      RootNavigation.navigate('Home')
      return responseJson
    })
    .catch(error => error);
  }
  
  if (action.type === LOADING) {
        next(action) // continue with the login
  }
}


export default userMiddleware
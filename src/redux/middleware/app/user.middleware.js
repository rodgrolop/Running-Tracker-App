import { USER_LOGIN, SET_USER, LOADING, setUser, setLoading } from '../../actions/user.actions'
import * as RootNavigation from '../../../navigation/RootNavigation'

import axios from 'axios'

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
      store.dispatch(setUser(responseJson.data))
      RootNavigation.navigate('Home')
    })
    .catch(error => error);
  }
  
  if (action.type === SET_USER) {
    next(action)
  }
  
  if (action.type === LOADING) {
    next(action)
  }
}


export default userMiddleware
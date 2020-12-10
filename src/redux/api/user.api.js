import axios from 'axios'

import { setUser, setLoading } from '../actions/user.actions'
import store from '../store'

import * as RootNavigation from '../../navigation/RootNavigation'

// TODO urls in config file
const apiHost = 'https://www.sansilvestrevalladolid.es/wp-json/jwt-auth/v1/token'

export const userLogin = loginData => {
    
    let formData = new FormData();
    
    formData.append('username', loginData.username)
    formData.append('password', loginData.password)
    
    store.dispatch(setLoading(true)) 
  
    axios.post( apiHost, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(responseJson => {
      // TODO protect
      // AsyncStorage.setItem('token', JSON.stringify(responseJson.data))
      store.dispatch(setUser(responseJson.data))
      RootNavigation.navigate('Home')
    })
    .catch(error => 
      console.log(error))
}
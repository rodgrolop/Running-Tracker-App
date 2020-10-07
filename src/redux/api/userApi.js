
import axios from 'axios'

export const loginUser = inputData => { 
    
    // temporal, meter en env variables
    const apiHost = 'https://pucelarun.es/wp-json'
  
    let formData = new FormData();
    
    formData.append('username', inputData.username)
    formData.append('password', inputData.password)
  
    axios.post( apiHost + '/jwt-auth/v1/token', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(responseJson => responseJson)
    .catch(error => error);
  }
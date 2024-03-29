import { GET_START_POSITION } from '../../actions/tracking.actions'

const trackingMiddleware = store => next => action => {  
  
  if (action.type === GET_START_POSITION) {
    next(action)
  }
  
  else {
    next(action)
  }
  
}

export default trackingMiddleware
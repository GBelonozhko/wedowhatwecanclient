import { SUBSCRIBE_NL, SUBSCRIBE_FAIL,GET_SUBSCRIBERS, REMOVE_SUBSCRIBER } from '../Actions/types';
  
  const initialState = {
    email:''
  };
  
  export default function subscribeReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case SUBSCRIBE_FAIL:
      case SUBSCRIBE_NL:
        return action.subscriber;
      
      case GET_SUBSCRIBERS:  
      return action.email;
      case REMOVE_SUBSCRIBER:
        return state.filter(subscriber => subscriber._id !== action._id);
      default:
        return state;
    }
  }
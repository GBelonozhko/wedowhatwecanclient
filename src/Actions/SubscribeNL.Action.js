import axios from 'axios';
import { SUBSCRIBE_NL, GET_SUBSCRIBERS, REMOVE_SUBSCRIBER } from './types';
import { setAlert } from './Alert.Action';


export function subscribeNL(subscribe) {
  return {
    type: SUBSCRIBE_NL,
    email: subscribe,
  };
};

export function getSubscribers() {
  return function(dispatch) {
    return axios.get('/api/subscribers')
      .then(function(response) {
        dispatch({type: GET_SUBSCRIBERS, email: response.data})
      })
      .catch(function(error) { console.log('error', error); });
  };
};

export function removeSubscriber(_id) {
  return {
    type: REMOVE_SUBSCRIBER,
    _id: _id,
  };
};
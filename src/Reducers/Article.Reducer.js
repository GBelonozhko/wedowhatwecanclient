import { SET_ARTICLE } from '../Actions/types';

export default function articleReducer(state = {}, action) { 
  switch (action.type) {
    case SET_ARTICLE: 
      return action.article;
    default:
      return state;
  }
};
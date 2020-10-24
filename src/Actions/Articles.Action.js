import { get } from 'axios';

import {SET_ARTICLES, ADD_ARTICLE, SET_ARTICLE, REMOVE_ARTICLE, REPLACE_ARTICLE} from './types';

export function setArticles() {
    return function(dispatch) {
      return get('/api/articles')
        .then(function(response) {
          dispatch({type: SET_ARTICLES, articles: response.data})
        })
        .catch(function(error) { console.log('error', error); });
    };
  };
  
  export function addArticle(article) {
    return {
      type: ADD_ARTICLE,
      article: article,
    };
  };
  
  export function setArticle(article) {
    return {
      type: SET_ARTICLE,
      article: article,
    };
  };
  
  export function removeArticle(_id) {
    return {
      type: REMOVE_ARTICLE,
      _id: _id,
    };
  };
  
  export function replaceArticle(article) {
    return {
      type: REPLACE_ARTICLE,
      article: article,
    };
  }

  
import { combineReducers } from 'redux';
import Subscribe from './SubscribeNL.Reducer';
import Auth from './Auth.Reducer';
import articles from './Articles.Reducer';
import article from './Article.Reducer';
import Todos from './Todo.Reducer';


export default combineReducers({
    Subscribe,
    Auth:Auth,
    articles: articles,
    article: article,
    Todos
});


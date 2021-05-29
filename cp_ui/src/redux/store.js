import { createStore, combineReducers, applyMiddleware } from 'redux';
import language from './reducers/language.js'
import editions from './reducers/editions.js'
import thunk from 'redux-thunk';

const reducers = combineReducers({
	language, editions,
});

const store = createStore(reducers, applyMiddleware(thunk));


export default store;
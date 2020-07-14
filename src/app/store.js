import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers'

const localStore = JSON.parse(localStorage.getItem('comments'))
const initialState = localStore ? localStore : {} ;

const store = createStore(rootReducer(), initialState, applyMiddleware(thunk));

export default store;

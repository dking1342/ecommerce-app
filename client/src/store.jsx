import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// import {data} from './data.js';
import { productListReducer } from './reducers/productReducers';

// store setup
const initialState = {};
const reducer = combineReducers({
    productList: productListReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// store init
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
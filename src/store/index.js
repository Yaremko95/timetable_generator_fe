import { applyMiddleware, combineReducers, compose, createStore } from "redux";


import thunk from "redux-thunk";

const appReducer = combineReducers({

});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
export default () => createStore(appReducer, enhancer);
import { compose, createStore, applyMiddleware } from 'redux';
import { socketMiddleware } from './socket-middleware';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root-reducer';
import { wsActions } from '../services/actions/websockets';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

const store = createStore(rootReducer, enhancer); 


export default store;
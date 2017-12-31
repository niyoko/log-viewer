import { createStore } from 'redux';
import rootReducer from './reducers';
import { Map } from 'immutable';

export default () => {
  const initialState = Map();
  return createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
};
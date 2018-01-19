import { List, Set } from 'immutable';
import { combineReducers } from 'redux-immutable';

const logEntries = (state = List(), action) => {
  switch(action.type){
    case 'ADD_LOG_ENTRY':
      return state.push(action.entry);
    case 'CLEAR_ENTRIES':
      return List();
    default:
      return state;
  }
};

const knownLoggers = (state = Set(), action) => {
  switch(action.type){
    case 'ADD_LOG_ENTRY':
      return state.add(action.entry.get('name'));
    default:
      return state;
  }
};

const hiddenLogger = (state = Set(['ActiveRecord::Base', 'Rails', 'ActionView::Base']), action) => {
  switch(action.type){
    case 'HIDE_LOGGER':
      return state.add(action.name);
    case 'SHOW_LOGGER':
      return state.delete(action.name);
    default:
      return state;
  }
}

const selectedEntry = (state = null, action) => {
  switch(action.type){
    case 'SELECT_ENTRY':
      return action.entry;
    default:
      return state;
  }
}

export default combineReducers({
  logEntries,
  knownLoggers,
  hiddenLogger,
  selectedEntry
});
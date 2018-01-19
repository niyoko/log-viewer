import React from 'react';
import ReactDOM from 'react-dom';
import App from '~/App';
import { Provider } from 'react-redux';
import { ipcRenderer, remote } from 'electron';
import { Record } from 'immutable';
const uuidv4 = require('uuid/v4');

const LogEntryRecord = Record({
  id: null,
  level: 'UNKNOWN',
  thread_name: null,
  name: null,
  message: null,
  payload: null,
  time: null,
  duration: null,
  tags: null,
  level_index: 0,
  exception: null,
  metric: null
});

import '../sass/app.scss';
import 'react-virtualized/styles.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import 'highlight.js/styles/xcode.css';

import createStore from './createStore';

const store = createStore();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root')
);

ipcRenderer.on('ping', (event, arg) => {  
  const obj = JSON.parse(arg);
  obj['id'] = uuidv4(); 
  const entry = LogEntryRecord(obj);

  store.dispatch({ type: 'ADD_LOG_ENTRY', entry });
});
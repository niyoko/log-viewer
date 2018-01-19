import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import LogTable from './LogTable';
import LoggerList from './LoggerList';
import EntryDetail from './EntryDetail';

class App extends React.PureComponent {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div style={{display: 'flex', width: '100%', height: '100%'}}>
        <div style={{flex: '0 0 200px', position: 'relative'}}><LoggerList /></div>
        <div style={{flex: '1 1', display: 'flex', flexDirection: 'column'}}>
          <div style={{flex: '1 1', position: 'relative'}}><LogTable /></div>
          <div style={{flex: '0 0 200px', position: 'relative'}}><EntryDetail /></div>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
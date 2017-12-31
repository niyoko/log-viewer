import React from 'react';

class EntryDetail extends React.PureComponent {
  render(){
    const { entry } = this.props;
    return (
      <div>
        {
          entry && (
            <div>
              <div>{entry.get('message')}</div>
              <div>
                <div>Payload</div>
                <textarea value={JSON.stringify(entry.get('payload'))} />
              </div>
              <div>
                <div>Exception</div>
                <textarea value={JSON.stringify(entry.get('exception'))} />
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

import { connect } from 'react-redux';

const mapState = state => {
  const entries = state.get('logEntries');
  const selectedEntry = state.get('selectedEntry');
  const entry = entries.find(x => x.get('id') === selectedEntry);

  return { entry };
};

const mapDispatch = dispatch => {
  return {};
}

export default connect(mapState, mapDispatch)(EntryDetail);
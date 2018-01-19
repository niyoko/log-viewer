import React from 'react';
import yaml from 'js-yaml';

class EntryDetail extends React.PureComponent {
  render(){
    const { entry } = this.props;
    return (
      <div className="entry-detail">
        {
          entry && (
            <div>
              { entry.get('message') && (
                <div>
                  <pre>{entry.get('message')}</pre>
                </div>
              )}
              { entry.get('payload') && (
                <div>
                  <div>Payload</div>
                  <textarea readOnly value={yaml.safeDump(entry.get('payload'))} />
                </div>
              )}
              { entry.get('exception') && (
                <div>
                  <div>Exception</div>
                  <textarea readOnly value={yaml.safeDump(entry.get('exception'))} />
                </div>
              )}
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
import React from 'react';
import yaml from 'js-yaml';
var Prism = require('prismjs');


class EntryDetail extends React.PureComponent {
  render(){
    const { entry } = this.props;
    return (
      <div className="entry-detail">
        {
          entry && (
            <div>
              <input type="text" readonly value={entry.get('message')} />
              { entry.get('payload') && (
                <div>
                  <div>Payload</div>
                  <div>{yaml.safeDump(entry.get('payload'))}</div>
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
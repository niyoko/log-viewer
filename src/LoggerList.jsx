import React from 'react';
import { createSelector } from 'reselect';
import { uniq } from 'lodash';
import { connect } from 'react-redux';

class LoggerList extends React.PureComponent {
  constructor(props, context){
    super(props, context);
    
    this._hiddenLoggerChange = e => {
      const { currentTarget } = e;
      const { name } = currentTarget.dataset;
      const { checked } = currentTarget;

      if(checked) this.props.hideLogger(name);
      else this.props.showLogger(name);
    };
  }
  render(){
    const { loggers } = this.props;
    return (
      <div>
        {
          loggers.map(x => {
            return (
              <div className="form-check" key={x}>
                <input className="form-check-input" type="checkbox"
                  data-name={x}
                  checked={this.props.hiddenLogger.has(x)}
                  onChange={this._hiddenLoggerChange} />
                <label className="form-check-label" style={{
                  textDecoration: this.props.hiddenLogger.has(x) ? 'line-through' : 'none'
                }}>
                  {x}
                </label>
              </div>
            )
          })
        }
      </div>
    );
  }
}

const loggerNameSelector = state => state.get('knownLoggers');


const mapState = state => {
  return {
    loggers: loggerNameSelector(state),
    hiddenLogger: state.get('hiddenLogger')
  }
};

const mapDispatch = dispatch => {
  return {
    hideLogger: name => dispatch({ type: 'HIDE_LOGGER', name }),
    showLogger: name => dispatch({ type: 'SHOW_LOGGER', name })
  };
}

export default connect(mapState, mapDispatch)(LoggerList);
import React from 'react';
import { List, Column, SortDirection, AutoSizer } from 'react-virtualized';
import { List as List2 } from 'immutable';
import { connect } from 'react-redux'


class LogTable extends React.PureComponent {
  constructor(props, context){
    super(props, context);

    const sortBy = 'index';
    const sortDirection = SortDirection.ASC;

    this.state = {
      disableHeader: false,
      headerHeight: 30,
      hideIndexRow: false,
      overscanRowCount: 10,
      rowHeight: 24,
      scrollToIndex: undefined,
      sortBy,
      sortDirection,
      useDynamicRowHeight: false,
    };

    const getMessage = entry => {
      if(entry.get('message')) return entry.get('message');
      //if(entry.get('exception') && entry.get('exception').message) return entry.exception.message;
      return '(no message)';
    };

    this._selectEntry = e => {
      const { id } = e.currentTarget.dataset;
      this.props.selectEntry(id);
    };

    this._rowRenderer = ({index, isScrolling, key, style}) => {
      const s = this.props.entries.size;
      const d = this.props.entries.get(s-index-1);
      const even = (index % 2) === 0;

      let cls = `log-entry log-entry-${d.get('level')}`;
      if(even) cls += ' log-entry-even';
      else cls += ' log-entry-odd';

      if(d.get('id') === this.props.selectedEntry){
        cls += ' log-entry-selected';
      }

      return (
        <div style={style} key={key} className={cls} data-id={d.get('id')} onClick={this._selectEntry}>
          <div className="log-entry-icon" />
          <div className="log-entry-message" style={{whiteSpace: 'nowrap'}}>{getMessage(d)}</div>
        </div>
      );
    };
  }

  componentDidMount(){

  }

  render(){
    const {
      disableHeader,
      headerHeight,
      hideIndexRow,
      overscanRowCount,
      rowHeight,
      rowCount,
      scrollToIndex,
      sortBy,
      sortDirection,
      sortedList,
      useDynamicRowHeight,
    } = this.state;

    const { entries, selectedEntry } = this.props;

    return (
      <div className="log-table">
        <div>{this.props.xselectedEntry}</div>
        <AutoSizer>
          {({width, height}) => (
            <List
              selectedEntry={selectedEntry}
              ref="List"
              height={height}
              overscanRowCount={overscanRowCount}
              rowCount={entries.size}
              rowHeight={rowHeight}
              rowRenderer={this._rowRenderer}
              scrollToIndex={scrollToIndex}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    )
  }
}

const mapState = state => {
  let entries = state.get('logEntries');
  const hiddenLogger = state.get('hiddenLogger');
  entries = entries.filter(x => !hiddenLogger.has(x.get('name')));

  return {
    entries,
    selectedEntry: state.get('selectedEntry')
  }
};

const mapDispatch = dispatch => {
  return {
    selectEntry: entry => dispatch({ type: 'SELECT_ENTRY', entry })
  };
}

export default connect(mapState, mapDispatch)(LogTable);
'use strict';

import React from 'react';
import FileListEntry from './file_list_entry';
import _ from 'lodash';

const FileList = React.createClass({
  handleFileSelectClick: function(fileName) {
    if(this.props.onSelect) {
      this.props.onSelect(fileName);
    }
  }
  , entryToLi: function(f) {
    return <li key={f}><a onClick={_.partial(this.handleFileSelectClick, f)} href={'#/' + f}><FileListEntry fileName={f}/></a></li>;
  }
  , render: function() {
    let contains;
    // TODO: Should move to a string helper
    // perhaps a String.prototype.regexMatch(string, regex);
    // then partially apply the regex
    if(this.props.filter) {
      contains = (f) => f.match(this.props.filter);
    }
    else {
      contains = () => true;
    }
    const entries = _.map(_.filter(this.props.fileList, contains), this.entryToLi);
    return (
      <div>
        <ul>
          {entries}
        </ul>
      </div>
    );
  }
});

module.exports = FileList;

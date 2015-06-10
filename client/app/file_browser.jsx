'use strict';

import React from 'react';
import FileBrowserEntry from './file_browser_entry';
import _ from 'lodash';

const FileBrowser = React.createClass({
  render: function() {
    const entryToLi = (f) => <li key={f}><FileBrowserEntry fileName={f}/> </li>;
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
    const entries = _.map(_.filter(this.props.fileList, contains), entryToLi);
    return (
      <div>
        <ul>
          {entries}
        </ul>
      </div>
    );
  }
});

module.exports = FileBrowser;

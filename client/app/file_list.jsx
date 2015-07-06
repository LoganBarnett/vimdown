'use strict';

import React from 'react';
import FileListEntry from './file_list_entry';
import mori from 'mori';

const FileList = React.createClass({
  handleFileSelectClick: function(fileName) {
    if(this.props.onSelect) {
      this.props.onSelect(fileName);
    }
  }
  , entryToLi: (selectHandler, file) => {
    const {fileName, selected} = mori.toJs(file);
    return <FileListEntry key={fileName} fileName={fileName} selected={selected} onSelect={mori.partial(selectHandler, fileName)}/>;
  }
  , render: function() {
    let contains;
    // TODO: Should move to a string helper
    // perhaps a String.prototype.regexMatch(string, regex);
    // then partially apply the regex
    if(this.props.filter) {
      contains = (f) => f.fileName.match(this.props.filter);
    }
    else {
      contains = () => true;
    }
    const entries = mori.comp(
        mori.partial(mori.map, mori.partial(this.entryToLi, this.handleFileSelectClick))
      , mori.partial(mori.filter, contains)
    )(this.props.fileList);
    return (
      <div>
        <ul className="list-unstyled">
          {mori.toJs(entries)}
        </ul>
      </div>
    );
  }
});

module.exports = FileList;

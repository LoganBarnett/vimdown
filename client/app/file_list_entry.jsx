'use strict';

import React from 'react';

const FileListEntry = React.createClass({
  render: function() {
    return (
      <div>{this.props.fileName }</div>
    );
  }
});

module.exports = FileListEntry;


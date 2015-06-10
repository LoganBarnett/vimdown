'use strict';

import React from 'react';

const FileListLoadError = React.createClass({
  render: function() {
    return <div>
      <div className="title">Error loading file list</div>
      <div className="reason">{this.props.reason}</div>
    </div>;
  }
});

module.exports = FileListLoadError;
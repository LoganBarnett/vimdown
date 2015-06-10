'use strict';

import React from 'react';

const FileBrowserEntry = React.createClass({
  render: function() {
    return (
      <div>{this.props.fileName }</div>
    );
  }
});

module.exports = FileBrowserEntry;


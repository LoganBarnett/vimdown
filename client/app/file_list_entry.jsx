'use strict';

import React from 'react';

const FileListEntry = React.createClass({
  handleClick: function() {
    if(this.props.onSelect) {
      this.props.onSelect();
    }
  }
  , render: function() {
    const className = this.props.selected ? 'selected' : '';
    return (
      <li className={className}><a href={'#/' + this.props.fileName} onClick={this.handleClick} ><div>{this.props.fileName }</div></a></li>
    );
  }
});

module.exports = FileListEntry;


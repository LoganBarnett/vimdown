'use strict';

//const React = require('react');
import React from 'react';
import marked from 'marked';

const MarkdownView = React.createClass({
  render: function() {
    const markdown = marked(this.props.markdown || 'asdf');
    return (
      <div key="markdown-view" dangerouslySetInnerHTML={ {__html: markdown} }></div>
    );
  }
});

React.render(
    <MarkdownView />
  , document.body
);

module.exports = MarkdownView;

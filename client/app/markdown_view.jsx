'use strict';

import React from 'react';

const markdownRenderer = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: false,
})
  .use(require('markdown-it-checkbox'))
;

const MarkdownView = React.createClass({
  render: function() {
    //console.log('rendering markdown', this.props.markdown);
    const markdown = markdownRenderer.render(this.props.markdown || '');
    return (
      <div key="markdown-view" dangerouslySetInnerHTML={ {__html: markdown} }></div>
    );
  }
});

// TODO: Do we still need this?
React.render(
    <MarkdownView />
  , document.body
);

module.exports = MarkdownView;

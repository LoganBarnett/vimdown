'use strict';

import React from 'react';
import marked from 'marked';

const MarkdownView = React.createClass({
  render: function() {
    //console.log('rendering markdown', this.props.markdown);
    const markdown = marked(this.props.markdown || '');
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

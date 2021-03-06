'use strict';

require('../../utils/test/function_bind_polyfill');
const MarkdownView = require('./markdown_view');
const React = require('react');
require('react/addons');

describe('MarkdownView', () => {
  it('renders a markdown element', () => {
    const output = React.addons.TestUtils.renderIntoDocument(<MarkdownView markdown={'**I\'ma header!**'}/>);
    const node = React.findDOMNode(output);
    expect(node.innerHTML.trim()).toEqual('<p><strong>I\'ma header!</strong></p>');
  });
});
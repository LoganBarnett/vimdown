'use strict';

require('../../utils/test/function_bind_polyfill');
const MarkdownView = require('./app');
const React = require('react');
require('react/addons');

describe('app', () => {
  it('renders a markdown element', () => {
    const renderer = React.addons.TestUtils.createRenderer();
    renderer.render(<MarkdownView />);
    const output = renderer.getRenderOutput();
    expect(output).toEqual(<div>Some stuff</div>);
  });
});
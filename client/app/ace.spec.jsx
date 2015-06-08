'use strict';

require('../../utils/test/function_bind_polyfill');
//const Ace = require('./ace');
const React = require('react');
require('react/addons');

describe('Ace', () => {
  xit('fails or passes - whatevs', () => {
    expect(true).toBe(true);
  });
  xit('renders the ACE Editor', () => {
    const output = React.addons.TestUtils.renderIntoDocument(<Ace text={'foo'}/>);
    const node = React.findDOMNode(output);
    expect(output).toEqual(<div id="editor"></div>);
  });
});

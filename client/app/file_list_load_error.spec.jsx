'use strict';

const FileListLoadError = require('./file_list_load_error');
require('../../utils/test/function_bind_polyfill');
const React = require('react');
require('react/addons');
const TestUtils = React.addons.TestUtils;

describe('FileListLoadError', () => {
  it('displays an error message with a reason', () => {
    const element = <FileListLoadError reason={'Intertubes are down.'} />;
    const markup = TestUtils.renderIntoDocument(element);
    expect(markup.getDOMNode().querySelector('.title').textContent).toEqual('Error loading file list');
    expect(markup.getDOMNode().querySelector('.reason').textContent).toEqual('Intertubes are down.');
  });
});

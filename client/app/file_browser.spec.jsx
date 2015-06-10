'use strict';

require('../../utils/test/function_bind_polyfill');
const FileBrowser = require('./file_browser');
const FileBrowserEntry = require('./file_browser_entry');
const React = require('react');
const TestUtils = React.addons.TestUtils;
require('react/addons');

describe('FileBrowser', () => {
  it('shows a list of files', () => {
    const fileList = ['foo', 'bar'];
    const element = <FileBrowser fileList={fileList} />;
    const markup = TestUtils.renderIntoDocument(element);
    const results = TestUtils.scryRenderedComponentsWithType(markup, FileBrowserEntry);
    expect(results.length).toEqual(2);
  });

  it('searches for files', () => {
    const fileList = ['foo', 'bar', 'foobar'];
    const element = <FileBrowser fileList={fileList} filter={'f'}/>;
    const markup = TestUtils.renderIntoDocument(element);
    const results = TestUtils.scryRenderedComponentsWithType(markup, FileBrowserEntry);
    expect(results.length).toEqual(2);
  });

  // hmmm then it's FileBrowserOrError, right?
  // TODO: Break this out into FileListLoadError
  it('displays errors getting files');
});

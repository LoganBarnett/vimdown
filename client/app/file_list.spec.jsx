'use strict';

require('../../utils/test/function_bind_polyfill');
const FileList = require('./file_list');
const FileListEntry = require('./file_list_entry');
const React = require('react');
const TestUtils = React.addons.TestUtils;
require('react/addons');

describe('FileList', () => {
  it('shows a list of files', () => {
    const fileList = ['foo', 'bar'];
    const element = <FileList fileList={fileList} />;
    const markup = TestUtils.renderIntoDocument(element);
    const results = TestUtils.scryRenderedComponentsWithType(markup, FileListEntry);
    expect(results.length).toEqual(2);
  });

  it('searches for files', () => {
    const fileList = ['foo', 'bar', 'foobar'];
    const element = <FileList fileList={fileList} filter={'f'}/>;
    const markup = TestUtils.renderIntoDocument(element);
    const results = TestUtils.scryRenderedComponentsWithType(markup, FileListEntry);
    expect(results.length).toEqual(2);
  });

  // hmmm then it's FileBrowserOrError, right?
  // TODO: Break this out into FileListLoadError
  it('displays errors getting files');
});
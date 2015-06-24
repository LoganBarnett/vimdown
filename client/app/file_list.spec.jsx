'use strict';

require('../../utils/test/function_bind_polyfill');
const FileList = require('./file_list');
const FileListEntry = require('./file_list_entry');
const React = require('react');
const TestUtils = React.addons.TestUtils;
require('react/addons');
import mori from 'mori'; // TODO: Is there a shorthand for import?

describe('FileList', () => {
  it('shows a list of files', () => {
    const fileList = mori.vector({fileName: 'foo'}, {fileName: 'bar'});
    const element = <FileList fileList={fileList} />;
    const markup = TestUtils.renderIntoDocument(element);
    const results = TestUtils.scryRenderedComponentsWithType(markup, FileListEntry);
    expect(results.length).toEqual(2);
  });

  it('searches for files', () => {
    const fileList = mori.vector({fileName: 'foo'}, {fileName: 'bar'}, {fileName: 'foobar'});
    const element = <FileList fileList={fileList} filter={'f'}/>;
    const markup = TestUtils.renderIntoDocument(element);
    const results = TestUtils.scryRenderedComponentsWithType(markup, FileListEntry);
    expect(results.length).toEqual(2);
  });

  it('allows file selection', () => {
    const fileList = mori.vector({fileName: 'foo'}, {fileName: 'bar'}, {fileName: 'foobar'});
    const fileSelected = jasmine.createSpy('fileSelected');
    const element = <FileList fileList={fileList} onSelect={fileSelected} />;
    const markup = TestUtils.renderIntoDocument(element);
    const links = TestUtils.scryRenderedDOMComponentsWithTag(markup, 'a');
    expect(fileSelected).not.toHaveBeenCalled();
    TestUtils.Simulate.click(links[0].getDOMNode());
    expect(fileSelected).toHaveBeenCalledWith('foo');
  });

  it('marks the selected file', () => {
    const fileList = mori.vector({fileName: 'foo'}, {fileName: 'bar', selected: true}, {fileName: 'foobar'});
    const element = <FileList fileList={fileList} selectedFileName={'bar'} />;
    const markup = TestUtils.renderIntoDocument(element);
    const entries = TestUtils.scryRenderedComponentsWithType(markup, FileListEntry);
    const _ = require('lodash');
    expect(entries[0].props.selected).toBeFalsy();
    expect(entries[1].props.selected).toBe(true);
    expect(entries[2].props.selected).toBeFalsy();
  });
});

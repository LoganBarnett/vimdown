'use strict';

require('../../utils/test/function_bind_polyfill');
import React from 'react';
import FileListEntry from './file_list_entry';
require('react/addons');
const TestUtils = React.addons.TestUtils;

describe('FileListEntry', () => {
  it('indicates if it is selected', () => {
    const element = <FileListEntry fileName={'foo'} selected={true} />;
    const markup = TestUtils.renderIntoDocument(element);
    const attr = markup.getDOMNode().attributes.item('class');
    expect(attr.value).toEqual('selected');
  });
});

'use strict';

import mori from 'mori';

describe('File Selection', () => {
  it('selects files', () => {
    const files = mori.vector(
        mori.toClj({fileName: 'foo.md', selected: false})
      , mori.toClj({fileName: 'bar.md', selected: false})
      , mori.toClj({fileName: 'bazz.md', selected: false})
    );
    const targetFile = 'bar.md';
    const fileSelection = require('./file_selection');
    const results = fileSelection.selectFile(targetFile, files);
    const jsResults = mori.toJs(results);
    expect(jsResults[1].selected).toBe(true);
  });
});
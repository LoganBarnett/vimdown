'use strict';

import mori from 'mori';

const model = {};

model.selectFile = (targetFile, files) => {
  const setSelected = (selectedFile, file) => {
    return mori.merge(file, mori.hashMap('selected', mori.get(file, 'fileName') == selectedFile))
  };
  const resultFiles = mori.map(mori.partial(setSelected, targetFile), files);

  return resultFiles;
  /*
  */
};

module.exports = model;

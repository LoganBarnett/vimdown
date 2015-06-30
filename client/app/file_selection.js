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
  FileBrowser.getFileData(selectedFileName).then((data) => {
    text = data;
    //reacting = true;
    app.render();
    //reacting = false;
  }, (error) => {
    console.error('error', error);
    text = 'Error loading file "' + selectedFileName + '":' + error;
    app.render();
  });
  */
};

module.exports = model;

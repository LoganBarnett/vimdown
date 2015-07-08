'use strict';

import axios from 'axios';

const FileBrowser = {
  getList: () => {
    return axios.get('/api/v1/notes');
  }
  , getFileData: (fileName) => {
    return axios.get('/api/v1/notes/' + fileName).then((response) => {
      return response.data;
    });
  }
  , writeFile: (fileName, data) => {
    return axios.put('/api/v1/notes/' + fileName, {fileData: data}).then((response) => response.data);
  }
};
module.exports = FileBrowser;

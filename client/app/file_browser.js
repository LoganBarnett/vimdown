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
};
module.exports = FileBrowser;

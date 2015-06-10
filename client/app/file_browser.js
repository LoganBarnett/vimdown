'use strict';

import axios from 'axios';

const FileBrowser = {
  getList: () => {
    return axios.get('/api/v1/notes');
  }
};
module.exports = FileBrowser;

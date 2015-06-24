'use strict';

const NodeUtils = {};

NodeUtils.promisize = (nodeAsyncFn) => {
  return new Promise((resolve, reject) => {
    nodeAsyncFn((error, data) => {
      if(error) {
        reject(error);
      }
      else {
        resolve(data);
      }
    });
  });
};

module.exports = NodeUtils;

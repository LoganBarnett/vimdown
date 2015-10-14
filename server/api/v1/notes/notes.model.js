'use strict';

const q = require('q');
const fs = require('fs');
const mori = require('mori');
//import mori from 'mori';
//import NodeUtils from '../../../node_utils';
const NodeUtils = require('../../../node_utils');

var Model = {};

const filterIgnored = (blackList, x) => {
  return !mori.some((i) => x.match(i), blackList);
};

Model.getList = function(dir, ignoreList, files) {
  const clippedFiles = mori.map((p) => p.replace(dir + '/', ''), files );
  const filteredFiles = mori.filter(mori.partial(filterIgnored, ignoreList), clippedFiles);
  return mori.toJs(filteredFiles);
};

Model.getFileData = (path) => {
  return NodeUtils.promisize(mori.partial(fs.readFile, path, {encoding: 'utf-8'}));
};

Model.create = function(fileName, fileData) {
  var deferred = q.defer();
  fs.writeFile(fileName, fileData, (error) => {
    if(error) {
      deferred.reject(error);
    }
    else {
      deferred.resolve();
    }
  });
  return deferred.promise;
};

Model.update = function(fileName, fileData) {
  var deferred = q.defer();
  fs.writeFile(fileName, fileData, (error) => {
    if(error) {
      deferred.reject(error);
    }
    else {
      deferred.resolve();
    }
  });
  return deferred.promise;
};

Model.delete = function(fileName) {
  var deferred = q.defer();
  fs.unlink(fileName, (error) => {
    if(error) {
      deferred.reject(error);
    }
    else {
      deferred.resolve(result);
    }
  });
  return deferred.promise;
};


module.exports = Model;

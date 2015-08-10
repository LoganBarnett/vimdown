'use strict';

const q = require('q');
const fs = require('fs');
const mori = require('mori');
//import mori from 'mori';
//import NodeUtils from '../../../node_utils';
const NodeUtils = require('../../../node_utils');
const childProcess = require('child_process');

var Model = {};

Model.getList = function(dir) {
  return NodeUtils.promisize(mori.partial(childProcess.execFile, 'find', [dir, '-follow', '-type', 'f'], {})).then((stdout, stderr) => {
    if(stderr) {
      throw stderr
    }
    return mori.toJs(mori.map((p) => p.replace(dir + '/', ''), mori.rest(stdout.split('\n')) ));
  });
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

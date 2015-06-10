'use strict';

const q = require('q');
const fs = require('fs');

var Model = {};

Model.getList = function(dir) {
  var deferred = q.defer();
  fs.readdir(dir, (error, files) => {
    if(error) {
      deferred.reject(error);
    }
    else {
      deferred.resolve(files);
    }
  });
  return deferred.promise;
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

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

Model.create = function(generationSet) {
  var deferred = q.defer();
  Model.MongooseModel.create(generationSet, function(error, result) {
    if(error) {
      deferred.reject(error);
    }
    else {
      deferred.resolve(result);
    }
  });
  return deferred.promise;
};

Model.update = function(generationSet) {
  var deferred = q.defer();
  Model.MongooseModel.findByIdAndUpdate({_id: generationSet._id}, generationSet, {}, function(error, result) {
    if(error) {
      deferred.reject(error);
    }
    else {
      deferred.resolve(result);
    }
  });
  return deferred.promise;
};

Model.delete = function(generationSet) {
  var deferred = q.defer();
  Model.MongooseModel.remove(generationSet, function(error, result) {
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

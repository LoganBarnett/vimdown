'use strict';

var model = require('./notes.model');

var controller = {};

const NOTE_DIR = '/Users/logan/Dropbox/notes';

controller.index = function(req, res) {
  model.getList(NOTE_DIR).then(function(list) {
    res.json(list);
  }, function(error) {
    console.error(error);
    res.sendStatus(500);
  });
  return res;
};

controller.get = function(req, res) {
  console.log('getting file data for ', NOTE_DIR + '/' + req.params.fileName);
  model.getFileData(NOTE_DIR + '/' + req.params.fileName).then(function(fileData) {
    res.json(fileData);
  }, function(error) {
    console.error(error);
    res.sendStatus(500);
  });
  return res;
};

controller.create = function(req, res) {
  model.create(NOTE_DIR + '/' + req.query.fileName, req.body).then(function(result) {
    res.json(result);
  }, function(error) {
    console.error(error);
    res.sendStatus(500);
  });
  return res;
};

controller.update = function(req, res) {
  model.update(NOTE_DIR + '/' + req.query.fileName, req.body).then(function(result) {
    res.json(result);
  }, function(error) {
    console.error('error updating generation set model', error)
    res.sendStatus(500);
  });
  return res;
};

controller.delete = function(req, res) {
  model.delete(NOTE_DIR + '/' + req.query.fileName).then(function(result) {
    res.send(200);
  }, function(error) {
    console.error(error);
    res.sendStatus(500);
  });
  return res;
};

module.exports = controller;

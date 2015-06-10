'use strict';

var model = require('./notes.model');

var controller = {};

const NOTE_DIR = '~/Documents/notes';

controller.index = function(req, res) {
  model.getList(NOTE_DIR).then(function(list) {
    res.json(list);
  }, function(error) {
    res.send(500);
  });
  return res;
};

controller.create = function(req, res) {
  model.create(NOTE_DIR + '/' + req.query.fileName, req.body).then(function(result) {
    res.json(result);
  }, function(error) {
    res.send(500);
  });
  return res;
};

controller.update = function(req, res) {
  model.update(NOTE_DIR + '/' + req.query.fileName, req.body).then(function(result) {
    res.json(result);
  }, function(error) {
    console.error('error updating generation set model', error)
    res.send(500);
  });
  return res;
};

controller.delete = function(req, res) {
  model.delete(NOTE_DIR + '/' + req.query.fileName).then(function(result) {
    res.send(200);
  }, function(error) {
    res.send(500);
  });
  return res;
};

module.exports = controller;

'use strict';

var model = require('./notes.model');

var controller = {};

controller.index = function(req, res) {
  model.getList().then(function(list) {
    res.json(list);
  }, function(error) {
    res.send(500);
  });
  return res;
};

controller.create = function(req, res) {
  model.create(req.body).then(function(result) {
    res.json(result);
  }, function(error) {
    res.send(500);
  });
  return res;
};

controller.update = function(req, res) {
  model.update(req.body).then(function(result) {
    res.json(result);
  }, function(error) {
    console.error('error updating generation set model', error)
    res.send(500);
  });
  return res;
};

controller.delete = function(req, res) {
  model.delete(req.params.id).then(function(result) {
    res.send(200);
  }, function(error) {
    res.send(500);
  });
  return res;
};

module.exports = controller;

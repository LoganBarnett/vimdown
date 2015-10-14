'use strict';

var model = require('./notes.model');

var controller = {};

const config = require('../../../config/environment');
const notesDir = config.notesDir;
const blackList = config.blackList;
const NodeUtils = require('../../../node_utils');
const fs = require('fs');
const mori = require('mori');

const execFile = require('child_process').execFile;
const listFilesFn = (dir) => {
  return NodeUtils.promisize(mori.partial(execFile, 'find', [dir, '-follow', '-type', 'f'], {})).then((stdout, stderr) => {
    if(stderr) {
      throw stderr
    }
    // skip the first file (.)
    return mori.rest(stdout.split('\n'));
  });
};

const getIgnoreList = () => {
};

controller.index = function(req, res) {
  listFilesFn(notesDir).then((list) => {
    res.json(model.getList(notesDir, blackList, list));
  }, function(error) {
    console.error(error);
    res.sendStatus(500);
  });
  return res;
};

controller.get = function(req, res) {
  console.log('getting file data for ', notesDir + '/' + req.params.fileName);
  model.getFileData(notesDir + '/' + req.params.fileName).then(function(fileData) {
    res.json(fileData);
  }, function(error) {
    console.error(error);
    res.sendStatus(500);
  });
  return res;
};

controller.create = function(req, res) {
  model.create(notesDir + '/' + req.params.fileName, req.body).then(function(result) {
    res.json(result);
  }, function(error) {
    console.error(error);
    res.sendStatus(500);
  });
  return res;
};

controller.update = function(req, res) {
  const notePath = notesDir + '/' + req.params.fileName;
  model.update(notePath, req.body.fileData).then(function(result) {
    res.sendStatus(200);
  }, function(error) {
    console.error('error updating generation set model', error)
    res.sendStatus(500);
  });
  return res;
};

controller.delete = function(req, res) {
  model.delete(notesDir + '/' + req.query.fileName).then(function(result) {
    res.send(200);
  }, function(error) {
    console.error(error);
    res.sendStatus(500);
  });
  return res;
};

module.exports = controller;

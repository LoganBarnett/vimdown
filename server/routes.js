/**
 * Main application routes
 */

'use strict';

var errors = require('./errors');
var express = require('express');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  //app.use('/api/v1/generation_sets', require('./api/v1/generation_sets'));

  app.use('/', express.static(__dirname + '/../dist/'));
  //app.use('/bower_comonents', express.static(__dirname + "/../client/bower_components"));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  // TODO: This route makes the app work without the # but also makes the 404 not function properly. Blugh
  //app.route('/*')
  //  .get(function(req, res) {
  //    res.sendfile(app.get('appPath') + '/index.html');
  //  });
};

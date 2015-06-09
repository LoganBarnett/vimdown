'use strict';
/**
 * Main application file
 */

//var mongoose = require('mongoose');
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//mongoose.connect('mongodb://localhost/editoriffic');

var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

var bodyParser = require('body-parser');
app.use(bodyParser.json());

// prevent errors with the connection from killing the entire app
app.use(function (error, req, res, next) {
  if (!error) {
    next();
  } else {
    console.error(error.stack);
    res.send(500);
  }
});

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));

  console.log('Server running at http://%s:%d/', config.ip, config.port);
  console.log('Press CTRL+C to exit');

  // Check if we are running as root
  if (process.getgid() === 0) {
    process.setgid('nobody');
    process.setuid('nobody');
  }
});

process.on('SIGTERM', function () {
  if (server === undefined) return;
  server.close(function () {
    // Disconnect from cluster master
    process.disconnect && process.disconnect();
  });
});

// Expose app
exports = module.exports = app;

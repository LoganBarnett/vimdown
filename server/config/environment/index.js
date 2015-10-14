'use strict';

var path = require('path');
var _ = require('lodash');
const expandTilde = require('expand-tilde');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV

  // Root path of server
  , root: path.normalize(__dirname + '/../../..')

  // Server port
  , port: process.env.PORT || 8001

  // where to find our notes
  , notesDir: expandTilde('~/notes')

  // regular expressions - ignore on match
  , blackList: [
      '\\.git'
    // not sure why escaped dot doesn't work here but works above
    , '-slides/(plugin|css|package.json)'
    //, '-slides/(plugin|package\\.json|LICENSE|lib|test|README|CONTRIBUTING|\\.travis\\.yml)'
  ]
  // Should we populate the DB with sample data?
  //seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  //secrets: {
  //  session: 'angular-secret'
  //},

  // List of user roles
  //userRoles: ['guest', 'user', 'admin']

  // MongoDB connection options
  //mongo: {
  //  options: {
  //    db: {
  //      safe: true
  //    }
  //  }
  //}

  //, assetPathOffset: ''

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});

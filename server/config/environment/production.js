'use strict';

const expandTilde = require('expand-tilde');

module.exports = {
    ip: '127.0.0.1'
  , port: '11111'
  , root: 'dist'
  , notesDir: expandTilde('~/notes')
};

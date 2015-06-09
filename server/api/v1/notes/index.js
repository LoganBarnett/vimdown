'use strict';

var express = require('express');
var controller = require('./notes.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.put('/:file_name', controller.update);
router.delete('/:file_name', controller.delete);

module.exports = router;


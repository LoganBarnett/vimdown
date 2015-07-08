'use strict';

var express = require('express');
var controller = require('./notes.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:fileName', controller.get);
router.post('/', controller.create);
router.put('/:fileName', controller.update);
router.delete('/:fileName', controller.delete);

module.exports = router;


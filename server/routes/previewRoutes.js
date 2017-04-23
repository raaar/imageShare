var express = require('express');

var routes = function() {

  var previewRouter = express.Router();
  var previewController = require('../controllers/previewController')();


  previewRouter.route('/:id')
    .get(previewController.get);


  return previewRouter;
};

module.exports = routes;
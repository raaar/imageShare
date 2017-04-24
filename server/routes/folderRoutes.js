var express = require('express');


var routes = function() {

  var folderRouter = express.Router();
  var folderController = require('../controllers/folderController')();


  folderRouter.route('/')
    .post(folderController.createFolder)
    .get(folderController.get);


  folderRouter.route('/:id')
    .get(folderController.getFolder)
    .patch(folderController.patchFolder)
    .delete(folderController.deleteFolder);


  return folderRouter;
};

module.exports = routes;

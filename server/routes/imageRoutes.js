var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var routes = function() {

  var imageRouter = express.Router();
  var imageController = require('../controllers/imageController')();


  imageRouter.route('/')
    .post(imageController.post);


  imageRouter.route('/fetch')
    .get(imageController.get);


  // Middleware gets image by id
  imageRouter.use('/:id', imageController.middlewareFetchSingle);


  imageRouter.route('/:id')
    .get(function(req, res){
      res.json(req.image);
    })
    .delete(imageController.deleteImage);


  return imageRouter;
};

module.exports = routes;

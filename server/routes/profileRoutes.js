var express = require('express');
var mongodb = require('mongodb').MongoClient;

var routes = function() {
  var profileRouter = express.Router();
  var profileController = require('../controllers/profileController')();

  profileRouter.route('/all')
    .get(profileController.getAll);


  profileRouter.route('/:author')
    .get(profileController.getAuthor)
    .post(function(req,res) {
      console.log('post avatar');
    });
    
    
  return profileRouter;
};

module.exports = routes;

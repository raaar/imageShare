var express = require('express');
var mongodb = require('mongodb').MongoClient;
var dbConfig = require('../config/db');

var routes = function() {
  var profileRouter = express.Router();

  profileRouter.route('/:author')
    .get(function(req, res) {
      var user = req.user.username;
      var url = dbConfig.url;

      mongodb.connect(url, function(err, db) {
        var collection = db.collection('users');
        
        collection.findOne({username : req.user.username}, function(err, result) {
          if(err) {
            res.status(500).send(err);
          } else if(result) {
            res.json(result.username);
          } else {
            res.status(404).send('no user found');
          }
        });
      });
    
    });
    
  return profileRouter;
};

module.exports = routes;
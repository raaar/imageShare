var mongodb = require('mongodb').MongoClient;
var dbUrl = require('../config/db');
var _ = require('lodash');

var profileController = function() {

  var getAll = function(req, res) {
    var query = {};

    mongodb.connect(dbUrl, function(err, db) {
      if(err) {
        res.status(500).send(err);
      }

      var collection = db.collection('users');

      collection.find(query).toArray(function(err, results) {
              
        results.forEach(function (n) {
          delete n.password;
          delete n.salt;
        });
        
        res.json(results);
      });
    });
  }


  var getAuthor = function(req, res) {
      var user = req.user.username;
      var url = dbConfig.url;

      mongodb.connect(url, function(err, db) {
        var collection = db.collection('users');
        
        collection.findOne({username : req.user.username}, function(err, result) {
          if(err) {
            res.status(500).send(err);
          } else if(result) {
            // res.json(result.username);
            
            res.render('profile', {
              user: result.username,
              pageName: 'profile',
              message: 'hello profile',
              
            });
          } else {
            res.status(404).send('no user found');
          }
        });
      });
  }


  return {
    getAll: getAll,
    getAuthor: getAuthor
  }
}


module.exports = profileController;

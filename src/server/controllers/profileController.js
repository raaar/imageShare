/*  Profile Controller handles requests for all registered users, except from logged in user
 *
 * */

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

      collection.find(query).sort({ username: 1 }).toArray(function(err, results) {
              
        // remove private data from response
        results.forEach(function (n) {
          delete n.password;
          delete n.salt;
        });
        
        res.json(results);
      });
    });
  }


  // single author
  var getAuthor = function(req, res) {
    var user = req.user.username;
    var url = dbConfig.url;

    mongodb.connect(url, function(err, db) {
      var collection = db.collection('users');
        
      collection.findOne({username : req.user.username}, function(err, result) {
        if(err) {
          res.status(500).send(err);
        } else if(result) {

          res.render('profile', {
            user: result.username,
            pageName: 'profile',
            message: 'hello profile'
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

"use strict";

var fs = require('fs');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var dbUrl = process.env.MONGODB_URI;


var previewController = function() {
  
  var get = function(req, res) {
    
    var id = new objectId(req.params.id);
    
    mongodb.connect(dbUrl, function(err, db){
      
      if(err) {
        throw err;
      }

      var collection = db.collection('folders');

      collection.findOne({_id :id}, function(err, result) {
      
        if(err) {
          throw err;
        }

        // see if folder has public access
        if(result.publicPermission) {
          res.json(result);
        } else {
          res.send(500);
        }
      });
    });
  };
  
  
  return {
    get: get
  }
}


module.exports = previewController;
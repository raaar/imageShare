"use strict";

var fs = require('fs');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var dbUrl = process.env.MONGODB_URI; 


var folderController = function() {
  
  var createFolder = function(req, res) {
       
    var folderData = req.body;

    mongodb.connect(dbUrl, function(err, db) {
      if(err) {
        throw err;
      }

      var collection = db.collection('folders');
      collection.insert(folderData);
      res.send(folderData);
    });
  };

  
  var get = function(req, res) {
  
    var query = {};
    mongodb.connect(dbUrl, function(err, db) {
      if(err) {
        throw err;
      }

      var collection = db.collection('folders');

      // "-1" fetches images back in time
      collection.find(query).sort({ "title": -1 }).toArray(function(err, results) {
        if(err) {
          throw err;
        };

        res.json(results);
      });
    });
  };


  var getFolder = function(req, res) {
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

        res.json(result);
      });
    });
  };


  var patchFolder = function(req, res) {
    var id = new objectId(req.params.id);
    var updatedData = req.body;

    mongodb.connect(dbUrl, function(err, db){
      if(err) {
        throw err;
      }

      var collection = db.collection('folders');

      delete updatedData['_id'];

      collection.update( 
        {"_id": id},
        updatedData,
        {upsert: true}
      )
    });
  };


  var deleteFolder = function(req, res) {
    var id = new objectId(req.params.id);

    mongodb.connect(dbUrl, function(err, db){
      if(err) {
        throw err;
      }

      var collection = db.collection('folders');

      collection.findOne({_id : id}, function(err, image) {
        if (err) {
          throw err;
        };
              
        collection.deleteOne(
          {_id: objectId.createFromHexString(req.params.id)},
          function(err, result) {
            if (err) {
              throw err
            }

            res.json('Item deleted');
            console.log('Item deleted');
        });
      });

    });
  };


  return {
    getFolder,
    createFolder,
    deleteFolder,
    patchFolder,
    get
  };
};

module.exports = folderController;

"use strict";

var fs = require('fs');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var dbUrl = process.env.MONGODB_URI;


var imageController = function() {


  // get single image
  var middlewareFetchSingle = function(req, res, next) {
    var id = new objectId(req.params.id);

    mongodb.connect(dbUrl, function(err, db){
      if(err) {
        throw err;
      }

      var collection = db.collection('images');

      collection.findOne({_id : id}, function(err, image) {
        if(err) {
          res.status(500).send(err);
        } else if(image) {
          req.collection = collection;
          req.image = image;
          next();
        } else {
          res.status(404).send('no book found');
        }
      });
    });
  };


  // upload new image
  var post = function(req, res) {

    var fileName = req.body.id;
    var folderId = req.body.formData.folderId;
    var imageTitle = req.body.formData.title;
    var imageData;

    // if untitled
    if(!imageTitle) {
      imageTitle = fileName;
    }

    imageData = {
      title: imageTitle,
      author: req.user.username,
      folderId: folderId,
      image: {
        id: req.body.id,
        file: fileName,
        size: req.body.size,
        lastModified: req.body.lastModified,
        lastModifiedDate: req.body.lastModifiedDate
      }
    };

    mongodb.connect(dbUrl, function(err, db) {
      var collection = db.collection('images');
      collection.insert(imageData);
      res.send(imageData);
    });
  };


  // get all images
  var get = function(req, res){
    var id = new objectId(req.params.id);
    var query;
    var limit;

    if(req.query.after) {
      id = new objectId(req.query.after);
    }
                  

    query = {_id: {$lt: id}};
    limit = req.query.limit ? req.query.limit : 10;


    if ('author' in req.query) {
      query.author = req.query.author;
    }

    if ('title' in req.query) {
      query.title = req.query.title;
    }
    
    if ('folderId' in req.query) {
      query.folderId = req.query.folderId;
    }

    mongodb.connect(dbUrl, function(err, db) {
      if(err) {
        //res.status(500).send(err);
        return err;
      }

      var collection = db.collection('images');

      // "-1" fetches images back in time
      collection.find(query).sort({"_id":-1}).limit(parseInt(limit)).toArray(function(err, images) {
        if(err) {
          throw err;
        };

        res.json(images);
      });
    });
  };
  
  
  var deleteImage = function(req, res) {
    var id = new objectId(req.params.id);

    mongodb.connect(dbUrl, function(err, db){
      if(err) {
        throw err;
      }

      var collection = db.collection('images');
      collection.findOne({_id : id}, function(err, image) {
        if (err) {
          throw err;
        }

        // user can only delete his own images
        if(image.author === req.user.username ) {
          collection.deleteOne(
          {_id: objectId.createFromHexString(req.params.id)},
          function(err, result) {
            if (err) {
              throw err
            }

            res.json('Item deleted');
            console.log('Item deleted');
          });
        } else {
          console.log('You don\'t have permission to delete this file' );
          res.json('You don\t have permission to delete this file');
          return;
        }
      });
    });
  }


  return {
    get: get,
    post: post,
    deleteImage: deleteImage,
    middlewareFetchSingle: middlewareFetchSingle
  }
}


module.exports = imageController;

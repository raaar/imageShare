"use strict";

var fs = require('fs');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
// var sharp = require('sharp'); // image processing library
var dbUrl = require('../config/db');


var imageController = function() {

  var middleware = function(req, res, next){
    // console.log('example middleware going...');
    next();
  };
  

  var middlewareFetchSingle = function(req, res, next) {
    var id = new objectId(req.params.id);

    mongodb.connect(dbUrl, function(err, db){
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



  var post = function(req, res) {

    var fileName = req.body.id;
    var imageTitle = req.body.formData.title;

    if(!imageTitle) {
      imageTitle = 'untitled';
    }

    var imageData = {
      title: imageTitle,
      author: req.user.username,
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


  var get = function(req, res){
    var id = new objectId(req.params.id);

    console.info('query: ', req.query);
    console.info('query: ', req.query.after);

    if(req.query.after)
      id = new objectId(req.query.after);
                  

    console.info('get images: ', id);

    var query = {_id: {$lt: id}};

    // http://localhost:9001/api/images?author=5@5.com

    if('title' in req.query) {
      query.title = req.query.title;
    }

    if ('author' in req.query) {
      query.author = req.query.author;
    }

    mongodb.connect(dbUrl, function(err, db) {
      if(err) {
        res.status(500).send(err);
      }

      var collection = db.collection('images');

      collection.find(query).sort({"_id":-1}).limit(5).toArray(function(err, images) {
        res.json(images);
      });
    });
  };
  

  
  var _queryNextPrev = function(req, res, direction) {
    var curId = new objectId(req.params.id);
    var query = {};


    if ('author' in req.query) {
      query.author = req.query.author;
    }

    mongodb.connect(dbUrl, function(err, db){
      var collection = db.collection('images');
     
      if(direction === 'next') {
        // Object assign merges two objects together
        collection.find(Object.assign( {_id: {$lt: curId}}, query )) .sort({_id: -1 }).limit(5).toArray(function(err, images){
          if(err)
            throw err

          res.json(images)
        });
      } else {
        collection.find(Object.assign( {_id: {$gt: curId}}, query )) .sort({_id: 1 }).limit(5).toArray(function(err, images){
          if(err)
            throw err

          res.json(images)
        });
      }
    });
  }
        

  var getNext = function(req, res){
    _queryNextPrev(req, res, 'next')
  };


  var getPrev = function(req, res){
    _queryNextPrev(req, res, 'prev')
  };


  var destroyImage = function(req, res) {
    var id = new objectId(req.params.id);

    mongodb.connect(dbUrl, function(err, db){
      if(err) {
        throw err;
      }

      var collection = db.collection('images');
      removeImage(req, res, collection, id);
    });
  }


  function removeImage (req, res, collection, id) {
    
    // fetch and delete DB entry...
    function destroyItem(next) {
      collection.findOne({_id : id}, function(err, image) {
        if (err) {
          throw err
        }

        if(image.author === req.user.username ) { // TODO: user should only be able to delete his own images
          collection.deleteOne(
          {_id: objectId.createFromHexString(req.params.id)},
          function(err, result) {
            if (err) {
              throw err
            }

            next(image);
          });
        } else {
          console.log('You don\'t have permission to delete this file' );
          res.json('You don\t have permission to delete this file');
          return;
        }
      });
    }
    
    // ...now we can delete residue files from the uploads folder
    destroyItem(function(image) {
      var files = ["public/uploads/images/" + image.image.full, "public/uploads/images/" + image.image.thumb];

      if(files) {
        files.forEach( function( fileName ) {
          if (fs.existsSync(fileName)) {
            fs.unlinkSync(fileName);
          }
        });
      }
 
      res.json('Item deleted');
      console.log('item deleted');
    });
  };


  return {
    get: get,
    post: post,
    getNext: getNext,
    getPrev: getPrev,
    destroyImage: destroyImage,
    middleware: middleware,
    middlewareFetchSingle: middlewareFetchSingle
  }


}


module.exports = imageController;

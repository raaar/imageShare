"use strict";

var fs = require('fs');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var dbConfig = require('../config/db');
var sharp = require('sharp'); // image processing library

// Reveal model pattern
var imageController = function() {

  var middleware = function(req, res, next){
    console.log('middleware going...');
    next();
  };
  
  var middlewareFetchSingle = function(req, res, next) {
    var url = dbConfig.url;
    var id = new objectId(req.params.id);

    mongodb.connect(url, function(err, db){
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

  var post = function(req , res) {
    if(/* !req.body.title || */  !req.file) {
      res.status(400);
      res.redirect('/?message=Missing+information');

      console.error('status 400, missing required form information:');
      console.info('title: ', req.body.title);
      console.info('file: ', req.file);
      console.info('image: ', req.body.image);
    } else {
      console.log('Backend submit successful');
      console.info(req.file);
      console.info(req.body);
      /* Data object passed by uploader
      fieldname: 'image',
      originalname: 'beach.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: 'public/uploads/',
      filename: 'e018096c66c2f8f25809e7721dae43ad',
      path: 'public/uploads/e018096c66c2f8f25809e7721dae43ad',
      size: 171938
      */
      console.info('image title: ', req.body.title);
    
      var image = {
        title: req.body.title,
        author: req.user.username,
        image: {
          id: req.file.filename,
          full: req.file.filename,
          thumb: 'thumb-' + req.file.filename,
          originalname: req.file.originalname,
          size: req.file.size
        }
      };
      
      var url = dbConfig.url;
      mongodb.connect(url, function(err, db) {
        var collection = db.collection('images');

        collection.insert(image, function(err, results) {
          
          if(err) {
            console.log(err);
          }

          // process image
          sharp('public/uploads/' + req.file.filename)
            .resize(300, 300)
            .toFile('public/uploads/' + 'thumb-' + req.file.filename , function (err, info) {
              if (err) {
                return err;
              }
            });
          


          res.status(201); // 201: item created
          //res.redirect('/archive');
          // res.send(book); // alternatively you can send json back to the browser
          res.send(image); 
        });
      });
      
    }
  };


  var get = function(req, res){
    var url = dbConfig.url;
    var id = new objectId(req.params.id);
    var query = {};

    if('title' in req.query) {
      query.title = req.query.title;
    }

    if ('author' in req.query) {
      query.author = req.query.author;
    }

    mongodb.connect(url, function(err, db) {
      if(err) {
        res.status(500).send(err);
      } else {
      }
      var collection = db.collection('images');

      collection.find(query).toArray(function(err, images) {
        res.json(images);
      });
    });
  };
  
  
  // var remove = function(req, res) {
  //   var url = dbConfig.url;
  //   var id = new objectId(req.params.id);

  //   console.log('remove function');

  //   mongodb.connect(url, function(err, db) {
  //     if(err) {
  //       res.status(500).send(err);
  //     } else {
        
  //       var collection = db.collection('images');
    
  //       var deleteImage = function(next) {
  //         collection.findOne({_id : id}, function(err, image) {
  //           if(image.author /*=== req.user.username */) {
              
  //             collection.deleteOne(
  //             {_id: objectId.createFromHexString(req.params.id)},
  //             function(err, result) {
  //               console.log('deleted DB entry, prepearing to delete files');
  //               next(res);
  //             });
  //           } else {
  //             console.log('can\'t delete' );
  //             return;
  //           }
  //         });
  //       };
    
  //       deleteImage(function(res){
  //         console.log('clean up uploads folder...');
  //         res.redirect('/archive');
  //       });

        
  

        
  //     }

  //   });
  // }
  
  
  var edit = function(req, res) {
      var url = dbConfig.url;
      var id = new objectId(req.params.id);
      
      mongodb.connect(url, function(err, db){
        var collection = db.collection('images');
  
        collection.findOne({_id : id}, function(err, image) {
          res.render('partials/_editImageForm', { image : image });
        });
      });
    };
   

  var update = function(req, res) {
    var url = dbConfig.url;
    var id = new objectId(req.params.id);
    
    mongodb.connect(url, function(err, db){
      var collection = db.collection('images');
      var image = {
        title : req.body.title,
        body : req.body.author,
        id: id
      };
      
      
      var isDelete = req.body.delete_button !== undefined;
      
      if(isDelete) {
        removeImage(req, res, collection, id);
      } else {
        updateImage(req, res, collection, id, image);
      }
    });
  };
  
  
  function updateImage(req, res, collection, id, image) {
    collection.update({_id: objectId.createFromHexString(req.params.id)},
      {$set: image }, function(err, updated) {

      if (err) {
        console.log(err);
      }

      res.redirect('/archive');
    });
  }
  
  function removeImage (req, res, collection, id) {
    
    // fetch and delete DB entry...
    function destroyItem(next) {
      collection.findOne({_id : id}, function(err, image) {
        if(image.author === req.user.username ) { // TODO: user should only be able to delete his own images
          collection.deleteOne(
          {_id: objectId.createFromHexString(req.params.id)},
          function(err, result) {
            next(image);
          });
        } else {
          console.log('You don\'t have permission to delete this file' );
          res.redirect('/archive');
          return;
        }
      });
    }
    
    // ...now we can delete residue files from the uploads folder
    destroyItem(function(image) {
      // console.log('destroy item ' + image.image.full);
      var files = ["public/uploads/" + image.image.full, "public/uploads/" + image.image.thumb];
      files.forEach( function( fileName ) {
        fs.unlinkSync(fileName);
      });
  
      res.redirect('/archive');
    });
  }

  return {
    get: get,
    post: post,
    edit: edit,
    update: update,
    middleware: middleware,
    middlewareFetchSingle: middlewareFetchSingle
  }
}


module.exports = imageController;

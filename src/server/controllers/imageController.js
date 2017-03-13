"use strict";

var fs = require('fs');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var sharp = require('sharp'); // image processing library
var dbUrl = require('../config/db');

// Reveal model pattern
var imageController = function() {


  var middleware = function(req, res, next){
    console.log('middleware going...');
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


  var post = function(req , res) {
    if(/* !req.body.title || */  !req.file) {
      res.status(400);
      res.redirect('/?message=Missing+information');

      console.error('status 400, missing required form information:');
    } else {
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

      if(req.file.size >= 1000000) {
        res.send({
          error: "Max file size is 1MB"
        });
        return;
      }

      if(req.file.mimetype !== 'image/jpeg') {
        console.error('File is not an image');
        return
      };

      var reqTitle = req.body.title;
      if(reqTitle ) {
        reqTitle = req.body.title;
      } else {
        reqTitle = req.file.filename;
      }

      var image = {
        title: reqTitle,
        author: req.user.username,
        // TODO: react complains about nested objects
        image: {
          id: req.file.filename,
          full: req.file.filename,
          thumb: 'thumb-' + req.file.filename,
          originalname: req.file.originalname,
          size: req.file.size
        }
      };
      
      mongodb.connect(dbUrl, function(err, db) {
        var collection = db.collection('images');

        collection.insert(image, function(err, results) {
          
          if(err) {
            console.log(err);
          }

          // process image
          sharp('public/uploads/images/' + req.file.filename)
            .resize(300, 300)
            .toFile('public/uploads/images/' + 'thumb-' + req.file.filename , function (err, info) {
              if (err) {
                return err;
              }
              res.status(201); // 201: item created
              res.send(image); 
            });
        });
      });
    }
  };

  var postImage = function(req, res) {
/*
      var image = {
        title: reqTitle,
        author: req.user.username,
        // TODO: react complains about nested objects
        image: {
          id: req.file.filename,
          full: req.file.filename,
          thumb: 'thumb-' + req.file.filename,
          originalname: req.file.originalname,
          size: req.file.size
        }
      };
*/
    // path: http://imageshareuploads.s3-website-eu-west-1.amazonaws.com
    var fileName = req.body.id + '.jpeg';

    var imageData = {
      title: req.body.formData.title,
      author: req.user.username,
      image: {
        id: req.body.id,
        full: fileName,// TODO: this could be removed
        file: fileName,
        size: req.body.size
      }
    };

    console.info('image data: ', imageData);

    mongodb.connect(dbUrl, function(err, db) {
      var collection = db.collection('images');
      collection.insert(imageData);
      res.send(imageData); 
    });
  };

  var get = function(req, res){
    var id = new objectId(req.params.id);
    var query = {};

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

      collection.find(query).toArray(function(err, images) {
        res.json(images);
      });
    });
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
    postImage: postImage,
    destroyImage: destroyImage,
    middleware: middleware,
    middlewareFetchSingle: middlewareFetchSingle
  }

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


  /*
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
  */
  /*
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
  */
 /* 
  function updateImage(req, res, collection, id, image) {
    collection.update({_id: objectId.createFromHexString(req.params.id)},
      {$set: image }, function(err, updated) {

      if (err) {
        console.log(err);
      }

      res.redirect('/archive');
    });
  }
  */

}


module.exports = imageController;

var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var dbConfig = require('../config/db');
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });


function removeImage (req, res, collection, id) {
  
  // fetch and delete DB entry...
  function destroyItem(next) {
    collection.findOne({_id : id}, function(err, image) {
      if(image.author /*=== req.user.username */) { // TODO: user should only be able to delete his own images
        collection.deleteOne(
        {_id: objectId.createFromHexString(req.params.id)},
        function(err, result) {
          next(image.image.id);
        });
      } else {
        console.log('can\'t delete' );
        return;
      }
    });
  }
  
  // ...now we can delete residue files from the uploads folder
  destroyItem(function(id) {
    console.log('destroy item ' + id)
    res.redirect('/archive');
  });
}

// Reveal model pattern
var imageController = function() {

  var middleware = function(req, res, next){
    console.log('middleware going...')
    next();
  };
  
  var middlewareFetchSingle = function(req, res, next) {
    // Book.findById(req.params.id, function(err, book) {
    //   if(err) {
    //     res.status(500).send(err);
    //   } else if(book) {
    //     req.book = book;
    //     next();
    //   } else {
    //     res.status(404).send('no book found');
    //   }
    // });
    
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
  }

  var post = function(req , res) {
    if(!req.body.title || !req.file) {
      res.status(400);
      res.redirect('/?message=Missing+information');

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
      var image = {
        title: req.body.title,
        author: req.user.username,
        image: {
          id: req.file.filename,
          full: req.file.filename,
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

          res.redirect('/archive');

          // res.status(201); // 201: item created
          // res.send(book); // alternatively you can send json back to the browser
          
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
      })
    });
  };
  
  
  var remove = function(req, res) {
    var url = dbConfig.url;
    var id = new objectId(req.params.id);

    console.log('remove function');

    mongodb.connect(url, function(err, db) {
      if(err) {
        res.status(500).send(err);
      } else {
        
        var collection = db.collection('images');
    
        var deleteImage = function(next) {
          collection.findOne({_id : id}, function(err, image) {
            if(image.author /*=== req.user.username */) {
              
              collection.deleteOne(
              {_id: objectId.createFromHexString(req.params.id)},
              function(err, result) {
                console.log('deleted DB entry, prepearing to delete files');
                next(res);
              });
            } else {
              console.log('can\'t delete' );
              return
            }
          });
        }
    
        deleteImage(function(res){
          console.log('clean up uploads folder...');
          res.redirect('/archive');
        });

        
  

        
      }

    });
  }
  
  
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
          collection.update({_id: objectId.createFromHexString(req.params.id)},
            {$set: image }, function(err, updated) {
  
            if (err) {
              console.log(err);
            }
  
            res.redirect('/archive');
          });
        }

      });
    };
  


  return {
    get: get,
    post: post,
    remove: remove,
    edit: edit,
    update: update,
    middleware: middleware,
    middlewareFetchSingle: middlewareFetchSingle
  };
};


module.exports = imageController;

var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });

// Reveal model pattern
var bookController = function() {

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
      var book = {
        title: req.body.title,
        author: req.user.username,
        image: {
          full: req.file.filename,
          originalname: req.file.originalname,
          size: req.file.size
        }
      };
      
      var url = 'mongodb://localhost:27017/bookREST';
      mongodb.connect(url, function(err, db) {
        var collection = db.collection('books');

        collection.insert(book, function(err, results) {
          
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
    var url = 'mongodb://localhost:27017/bookREST';
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
      var collection = db.collection('books');

      collection.find(query).toArray(function(err, books) {
        res.json(books);
      })
    });
  };
  
  
  var bookDelete = function(req, res) {
    var url = 'mongodb://localhost:27017/bookREST';
    var id = new objectId(req.params.id);

    mongodb.connect(url, function(err, db) {
      if(err) {
        res.status(500).send(err);
      } else {
        
        var collection = db.collection('books');
  
        collection.findOne({_id : id}, function(err, book) {
          if(book.author /*=== req.user.username */) {
            
            collection.deleteOne(
            {_id: objectId.createFromHexString(req.params.id)},
            function(err, result) {
              res.redirect('/archive');
            });
          } else {
            console.log('can\'t delete' );
            return
          }
        });
        
      }

    });
  }
  
  
  var bookEdit = function(req, res) {
      var url = 'mongodb://localhost:27017/bookREST';
      var id = new objectId(req.params.id);
      
      mongodb.connect(url, function(err, db){
        var collection = db.collection('books');
  
        collection.findOne({_id : id}, function(err, book) {
          res.render('partials/_editBookForm', { book : book });
        });
      });
    };
   
    
  var bookUpdate = function(req, res) {
      var url = 'mongodb://localhost:27017/bookREST';
      var id = new objectId(req.params.id);
      
      mongodb.connect(url, function(err, db){
        var collection = db.collection('books');
        var book = {
          title : req.body.title,
          body : req.body.author,
          id: id
        };
        
        
        var isDelete = req.body.delete_button !== undefined;
        
        if(isDelete) {
          
          // TODO: duplicate function in bookDelete();
          collection.findOne({_id : id}, function(err, book) {
            if(book.author /*=== req.user.username */) {
              
              collection.deleteOne(
              {_id: objectId.createFromHexString(req.params.id)},
              function(err, result) {
                res.redirect('/archive');
              });
            } else {
              console.log('can\'t delete' );
              return
            }
          });
        } else {
          collection.update({_id: objectId.createFromHexString(req.params.id)},
            {$set: book }, function(err, updated) {
  
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
    bookDelete: bookDelete,
    bookEdit: bookEdit,
    bookUpdate: bookUpdate
  };
};


module.exports = bookController;

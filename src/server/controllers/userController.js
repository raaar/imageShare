var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var sharp = require('sharp'); // image processing library
var dbConfig = require('../config/db');
var dbUrl = dbConfig.url;

var userController = function() {

  var postAvatar = function(req, res) {
    console.info('file: ',req.file);
    console.info('user: ', req.user); 

    var userData = {
      user: req.user,
      avatar: {
        large: req.file.filename,
        small: req.file.filename
      }
    }

    console.log(userData);
/*
    mongodb.connect(dbUrl, function(err, db){
      var collection = db.collection('useer');
      collection.findOne({_id : req.user._id}, function(err, user ) {
        console.info('queried user',  user); 
      });
    });
*/
          // process image
          sharp('public/uploads/avatar/' + req.file.filename)
            .resize(70, 70)
            .toFile('public/uploads/avatar/' + 'xs-' + req.file.filename , function (err, info) {
              if (err) {
                return err;
              }
                    
              res.status(201); // 201: item created
              res.send('avatar arrivet to bakend'); 
            });
         
  };
        
  var get = function(req, res) {
    var url = dbConfig.url;

    mongodb.connect(url, function(err, db) {
      var collection = db.collection('images');
      collection.find({}).toArray(function(err, results) {
        if(err)
          res.status(500).send(err);
        if(!req.user) {
          res.redirect('auth/register');
        } else {
          res.render('archive', {
            items: results,
            pageName: 'archive',
            message: '',
            user: req.user.username
          });
        }
      });
    });
    
    // Book.find('', function(err, books) {
    //   if(err)
    //     res.status(500).send(err);
    //   else
      
    //   if(!req.user) {
    //     res.redirect('auth/register');
    //   } else {
    //     res.render('archive', {
    //       books: books,
    //       pageName: 'archive'
    //     });
        
    //   }
    // });
  };

  // var post = function(req, res) {
  //     var book = new Book(req.body); // this works thanks to 'bodyParser';

  //     if(!req.body.title || !req.body.author) {
  //       // res.send('Missing information');
  //       res.status(400);
  //       res.render('index', {
  //         message: 'Missing information'
  //       });

  //     } else {
  //       book.save();
  //       res.status(201);

  //       Book.find('', function(err, books) {
  //         if(err)
  //           res.status(500).send(err);
  //         else
  //           res.redirect('archive');
  //       });
  //       //res.send(book);// 201: item created
  //     }
  // };


  // var removeItem = function(req, res) {
  //   // console.log('will delete this');
  //   console.log(req.params.id);


  //   Book.findById(req.body.id, function(err, book) {
  //     if(err) {
  //       res.status(500).send(err);
  //     } else if(book) {
  //       req.book = book;
  //       req.book.remove(function(err) {
  //         if(err)
  //           res.status(500).send(err);
  //         else
  //           res.status(204).send('Removed');
  //       });
  //     } else {
  //       res.status(404).send('no book found');
  //     }
  //   });
  // };

  return {
    get: get,
    postAvatar: postAvatar
  };
};

module.exports = userController;

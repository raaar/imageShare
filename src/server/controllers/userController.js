var mongodb = require('mongodb').MongoClient;
var sharp = require('sharp'); // image processing library
var dbConfig = require('../config/db');
var dbUrl = dbConfig.url;

var userController = function() {
 
  var patch = function(req, res) {
    var image = sharp('public/uploads/avatar/' + req.file.filename);

    image
      .metadata()
      .then(function(metadata) {
        return image
          .resize(70, 70)
          .toFile('public/uploads/avatar/' + 'xs-' + req.file.filename , function (err, info) {
            if (err) {
              return err;
            }
          });
      })
      .then(function(data) {
        mongodb.connect(dbUrl, function(err, db){
          var collection = db.collection('users');

          collection.update(
            { username: req.user.username },
            { $set: {
              avatar: req.file.filename
            }
            },
              { upsert: true }
            )
            res.status(201); // 201: item created
            res.send(req.file.filename); 
        });   // data contains a WebP image half the width and height of the original JPEG
      });
  };

  var get = function(req, res) {
    res.json({
      userName: req.user.username,
      id: req.user._id,
      avatar: req.user.avatar 
    });
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
    patch: patch
  };
};

module.exports = userController;

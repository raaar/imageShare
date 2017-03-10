var fs = require('fs');
var mongodb = require('mongodb').MongoClient;
var sharp = require('sharp'); // image processing library
var dbUrl = require('../config/db');

var userController = function() {
 
  var _handleImages = function(req, res, oldAvatar) {
    var image = sharp('public/uploads/avatar/' + req.file.filename);
    console.log(oldAvatar);
    image.resize(70, 70)
      .toFile('public/uploads/avatar/' + 'xs-' + req.file.filename , function (err, info) {
        if (err) {
          return err;
        }
      })
      .resize(130, 130)
      .toFile('public/uploads/avatar/' + 'lg-' + req.file.filename , function (err, info) {
        if (err) {
          return err;
        }

        res.status(201); // 201: item created
        res.send({
          userName: req.user.username,
          id: req.user._id,
          avatar: req.file.filename 
        });
      })
      
      
      // cleanup of old avatars
      var oldFiles = [
        "public/uploads/avatar/" + oldAvatar, 
        "public/uploads/avatar/xs-" + oldAvatar,
        "public/uploads/avatar/lg-" + oldAvatar
      ];

      if(oldFiles) {
        oldFiles.forEach( function( fileName ) {
          if (fs.existsSync(fileName)) {
            fs.unlinkSync(fileName);
          }
        });
      }

  };

  var patch = function(req, res) {
    if(req.file.size >= 500000) {
      res.send({
        error: "Avatar file is too big, 0.5mb max"
      });
      return;
    }

    mongodb.connect(dbUrl, function(err, db){
      var collection = db.collection('users');
      var oldAvatarFile;      

      if (err) {
        return err;
      }

      collection.findOneAndUpdate(
        { username: req.user.username },
        { $set: {
            avatar: req.file.filename
          }
        },
        { upsert: true },

        function(err ,data) {
          if(err){
            console.log("Something wrong when updating data!");
          }
          oldAvatarFile =  data.value.avatar;
          _handleImages(req, res, oldAvatarFile);
        }
      )
                
     });   // data contains a WebP image half the width and height of the original JPEG
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

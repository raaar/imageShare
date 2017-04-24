var fs = require('fs');
var mongodb = require('mongodb').MongoClient;
var dbUrl = process.env.MONGODB_URI;


var userController = function() {

  var post = function(req, res) {

    // Update avatar
    mongodb.connect(dbUrl, function(err, db){
      var collection = db.collection('users');

      if (err) {
        return err;
      }

      collection.findOneAndUpdate(
        { username: req.user.username },
        { $set: {
            avatar: req.body.id
          }
        },
        { upsert: true }
      );
                
      res.send(req.body);
    });
  };


  var get = function(req, res) {
    res.json({
      userName: req.user.username,
      id: req.user._id,
      avatar: req.user.avatar
    });
  };


  return {
    get: get,
    post: post
  };
};


module.exports = userController;

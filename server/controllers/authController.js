var express = require('express');
var mongodb = require('mongodb').MongoClient;
var dbUrl = process.env.MONGODB_URI;
var bcrypt = require('bcrypt');

var authController = function() {

  var logOut = function(req, res) {
    req.session.destroy();
    req.logout();
    res.send('Logged out');
  };
  
  
  var signIn =  function(req, res) {
    console.log('user authController');
    var userObj;
    
    // Success
    // httpOnly set to true, means that the cookie can only be read by the server and not client side Javascript
    res.cookie('user', req.user._id, {httpOnly: true});

    userObj = req.user;
    delete userObj['password'];

    // on succesfull login, send user info with response
    res.json({
      message:'logged in!',
      user: userObj
    });
  };
  
  
  var register = function(req, res) {
    mongodb.connect(dbUrl, function(err, db) {

      var collection = db.collection('users');
      var salt = bcrypt.genSaltSync(10);
      var encryptedPassword = bcrypt.hashSync(req.body.password, salt);

      var user = {
        username: req.body.username,
        password: encryptedPassword,
        salt: salt
      };
      

      let findUser = new Promise((resolve, reject) => {
        
        collection.findOne({
            username: req.body.username
          },
          function (err, results) {
            
            if(err) { return err; }
            
            if (null !== results) {
              res.json({
                status: 'error',
                message: 'Invalid username!'
              });
            } else {
              resolve("Success!"); // Yay! Everything went well!
            }
          }
        );
      });


      findUser.then((successMessage) => {
        
        collection.insert(user, function(err, results) {
          
          if(err) {
            return err;
          }
          
          req.login(results.ops[0], function(){
            
            var userObj = user;
            delete userObj['password'];
            delete userObj['salt'];
            
            res.json({
              status: 'success',
              message: 'User added',
              user: userObj
            });
          });
        });
      });

    });
  };
  
  
  return {
    register: register,
    logOut: logOut,
    signIn: signIn
  };
};

module.exports = authController;

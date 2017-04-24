var express = require('express');
var mongodb = require('mongodb').MongoClient;
var dbUrl = process.env.MONGODB_URI;
var bcrypt = require('bcrypt');
var dictionary = require('../../dictionary/dictionary');

var authController = function() {

  var logOut = function(req, res) {
    req.session.destroy();
    req.logout();
    res.send('Logged out');
  };
  
  
  var signIn =  function(req, res) {
    
    var userObj;
    
    // Success, add cookie
    // httpOnly set to true, means that the cookie can only be read by the server and not client side Javascript
    res.cookie('user', req.user._id, {httpOnly: true});

    userObj = req.user;
    delete userObj['password'];

    // on succesfull login, send user info to frontend
    res.json({
      message: dictionary.server.authWelcome + userObj.username,
      user: userObj
    });
  };
  
  
  var register = function(req, res) {
    mongodb.connect(dbUrl, function(err, db) {

      var collection = db.collection('users');
      var salt = bcrypt.genSaltSync(10);
      var encryptedPassword = bcrypt.hashSync(req.body.password, salt);
      var findUser;

      var user = {
        username: req.body.username,
        password: encryptedPassword,
        salt: salt
      };
      
      
      if(user.username.length <= 3) {
        res.json({
          status: 'error',
          message: dictionary.server.usernameShort
        });
        
        return;
      }


      if(req.body.password.length <= 3) {
        res.json({
          status: 'error',
          message: dictionary.server.passwordShort
        });
        
        return;
      }

      
      // See if user already exists in DB
      findUser = new Promise((resolve, reject) => {
        
        collection.findOne({
            username: req.body.username
          },
          function (err, results) {
            
            if(err) { return err; }
            
            if (null !== results) {
              
              res.json({
                status: 'error',
                message: dictionary.server.usernameTaken
              });
            } else {
              resolve(); // Yay! Everything went well!
            }
          }
        );
      });


      // Add user to DB
      findUser.then(() => {
        
        collection.insert(user, function(err, results) {
          
          if(err) {
            return err;
          }
          
          req.login(results.ops[0], function(){
            
            var userObj = user;
            delete userObj['password'];
            delete userObj['salt'];
            
            // Send user data to frontend
            res.json({
              status: 'success',
              message: dictionary.server.registerWelcome + userObj.username,
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
var express = require('express');
var mongodb = require('mongodb').MongoClient;
var dbUrl = process.env.MONGODB_URI;
var bcrypt = require('bcrypt');

var authController = function() {

  var get = function(req, res){
    res.render('auth', {
      message: '',
      registerUsernameMessage: ''
    });
  };


  var logOut = function(req, res) {
    req.session.destroy();
    req.logout();
    res.send('Logged out');
  };
  
  
  var signIn =  function(req, res) {
    // Success
    // httpOnly set to true, means that the cookie can only be read by the server and not client side Javascript
    res.cookie('user', req.user._id, {httpOnly: true});

    var userObj = req.user;
    delete userObj['password'];

    // on succesfull login, send user info with response
    res.json({
      message:'logged in!',
      user: userObj
    });
  };
  
  var register = function(req, res) {
    mongodb.connect(dbUrl, function(err, db) {

      var salt = bcrypt.genSaltSync(10);
      var passwordToSave = bcrypt.hashSync(req.body.password, salt);
      
      var collection = db.collection('users');

      var user = {
        username: req.body.userName,
        password: passwordToSave,
        salt: salt
      };
      
      // Check if user already exists in DB ...
      collection.findOne({
          username: req.body.userName
        },
        function (err, results) {
          if(err) { return err; }
          if (null !== results) {
            res.render('auth', {
              message: '',
              registerUsernameMessage: 'Invalid username!'
            });
          } else {
            addUser();
          }
        }
      );

      // ... if unique, add user to DB
      var addUser = function() {

        collection.insert(user, function(err, results) {
          req.login(results.ops[0], function(){
            res.redirect('/');
          });
        });
      }
    });
  }
  
  return {
    get: get,
    register: register,
    logOut: logOut,
    signIn: signIn
  }
};

module.exports = authController;

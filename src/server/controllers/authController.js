var express = require('express');
var mongodb = require('mongodb').MongoClient;
var dbUrl = require('../config/db');

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
    res.redirect('/');
  };
  
  var register = function(req, res) {
    mongodb.connect(dbUrl, function(err, db) {
      var collection = db.collection('users');
      var user = {
        username: req.body.userName,
        password: req.body.password
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

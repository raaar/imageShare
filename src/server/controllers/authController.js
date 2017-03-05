var express = require('express');
var mongodb = require('mongodb').MongoClient;
var dbConfig = require('../config/db');

var authController = function() {
  var logOut = function(req, res) {
    req.session.destroy();
    req.logout();
    res.send('Logged out');
  };
  
  var signIn =  function(req, res) {
    // Success
    res.cookie('user', req.user._id, {httpOnly: true}); // httpOnly set to true, means that the cookie can only be read by the server and not client side Javascript
    res.redirect('/');
  };
  
  var register = function(req, res) {
    mongodb.connect(url, function(err, db) {
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
            res.render('register', {
              message: 'Invalid username!'
            });
          } else {
            addUser();
          }
        }
      );

      // ... if unique, add user to DB
      var addUser = function() {

        collection.insert(user, function(err, results) {
          //console.log(results);
          req.login(results.ops[0], function(){
            res.redirect('/');
          });
        });
      }
    });
  }
  
  return {
    register: register,
    logOut: logOut,
    signIn: signIn
  }
};

module.exports = authController;

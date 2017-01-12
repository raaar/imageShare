var express = require('express');
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function() {

  var authRouter = express.Router();
  var authController = require('../Controllers/authController')();

  authRouter.route('/register')
    .get( function(req, res){
      res.render('register', {
        message: 'Register'
      });
    })
    .post(function(req, res) {
      var url = 'mongodb://localhost:27017/bookREST';

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
            console.log(results);
            req.login(results.ops[0], function(){
              res.redirect('/');
            });
          });
        }
      });
    });

  authRouter.route('/signIn')
    // We specify to pasport to use the loal strategy we have defiend
    // This could alternatively say 'google', or 'Facebook' auth
    .post(passport.authenticate('local', {
      failureRedirect: '/'
    }), function(req, res) {
      // Success
      res.redirect('/');
    });

  authRouter.route('/logout')
    .post(function(req, res) {
      req.session.destroy()
      req.logout()
      res.redirect('/')
    })

  return authRouter;
};

module.exports = router;
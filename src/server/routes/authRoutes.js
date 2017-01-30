var express = require('express');
var mongodb = require('mongodb').MongoClient;
var dbConfig = require('../config/db');
var passport = require('passport');

var router = function() {

  var authRouter = express.Router();
  var authController = require('../controllers/authController')();

  authRouter.route('/register')
    .get( function(req, res){
      res.render('register', {
        message: 'Register'
      });
    })
    .post(authController.register);

  authRouter.route('/signIn')
    // We specify to pasport to use the loal strategy we have defiend in config/strategies/local.strategy.js
    // This could alternatively say 'google', or 'Facebook' auth
    .post(passport.authenticate('local', {
      failureRedirect: '/'
    }),
    authController.signIn);

  authRouter.route('/logout')
    .post(authController.logOut);

  return authRouter;
};

module.exports = router;
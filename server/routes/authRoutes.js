var express = require('express');
var mongodb = require('mongodb').MongoClient;
var dbConfig = require('../config/db');
var passport = require('passport');

var router = function() {

  var authRouter = express.Router();
  var authController = require('../controllers/authController')();


  authRouter.route('/')
    .get(authController.get);


  authRouter.route('/register')
    .post(authController.register);


  authRouter.route('/signIn')
    // We specify to pasport to use the local strategy we have defiend in config/strategies/local.strategy.js
    // This could alternatively say 'Google', or 'Facebook' auth
    .post(passport.authenticate('local',
      {
        failureRedirect: '/'
      }),
      authController.signIn
    );

  authRouter.route('/logout')
    .post(authController.logOut);

  return authRouter;
};

module.exports = router;

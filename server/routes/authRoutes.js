var express = require('express');
var mongodb = require('mongodb').MongoClient;
var dbUrl = process.env.MONGODB_URI;
var passport = require('passport');

var router = function() {

  var authRouter = express.Router();
  var authController = require('../controllers/authController')();


  authRouter.route('/register')
    .post(authController.register);


  authRouter.route('/login')
    // We specify to pasport to use the local strategy we have defiend in config/strategies/local.strategy.js
    // This could alternatively say 'Google', or 'Facebook' auth
    .post(passport.authenticate('local',
      false
      ),
      authController.signIn
    );


  authRouter.route('/logout')
    .post(authController.logOut);

  return authRouter;
};

module.exports = router;

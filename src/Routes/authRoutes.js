var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function(nav) {
  authRouter.route('/register')
    .post(function(req, res) {
      // passport log in code
      console.log('logged in!');
    });

  return authRouter;
};

module.exports = router;

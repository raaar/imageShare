var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function(User) {
  authRouter.route('/register')
    .get(function(req, res){
      res.render('register', {
        message: 'Register'
      });
    })
    .post(function(req, res) {
      var user = new User(req.body); // this works thanks to 'bodyParser';

      if(!req.body.email || !req.body.password) {
        res.status(400);
        res.render('register', {
          message: 'Missing information'
        });
      } else {
        console.log('log in, redirecting');
        console.log(user.email);
        console.log(user.password);

        //user.save();

        //book.save();
        //res.status(201);
        //res.send(book);// 201: item created
      }

      // passport log in code
    });

  return authRouter;
};

module.exports = router;

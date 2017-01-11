var express = require('express');
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function(User) {

  var authRouter = express.Router();
  var authController = require('../Controllers/authController')(User);

  authRouter.route('/register')
    .get(authController.get)
    .post(authController.post);


  authRouter.route('/signIn')
    // We specify to pasport to use the loal strategy we have defiend
    // This could alternatively say 'google', or 'Facebook' auth
    .post(passport.authenticate('local', {
      failureRedirect: '/'
    }), function(req, res) {
      // Success
      res.redirect('/auth/profile');
    })
    .get(function(req,res){
      res.render('signIn', {
        message: 'Sign In'
      });
    })

  // authRouter.route('/signIn')
  //   .get(function(req,res){
  //     res.render('signIn', {
  //       message: 'Sign In'
  //     });
  //   })
  //   .post(function(req,res){
  //     User.findOne({email: req.body.email, password: req.body.password}, function(err, user){
  //       if(user != null) {
  //         console.log(user);
  //         //req.user = user;
  //         // begin session
  //       } else {
  //         console.log('Wrong credentials');
  //       }
  //     });
  //     console.log('sign in user ' + req.body.email);
  //   });

  return authRouter;
};

module.exports = router;
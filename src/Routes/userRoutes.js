var express = require('express');

var routes = function(Book) {
  var userRouter = express.Router();
  var userController = require('../Controllers/userController')(Book);

  userRouter.route('/').get(function(req, res) {

    if(!req.user) {
      res.render('register', {
        message: 'Register to log in'
      });
    } else {
      console.log('Logged in');

      res.render('index', {
        message: 'Welcome to my api',
        pageName: 'index'
      });
    }


  }).post(userController.post);

  userRouter.route('/archive')
    .get(userController.get)
    .post(userController.removeItem);

  return userRouter;
};

module.exports = routes;

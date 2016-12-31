var express = require('express');

var routes = function(Book) {
  var userRouter = express.Router();
  var userController = require('../Controllers/userController')(Book);

  userRouter.route('/').get(function(req, res) {
    res.render('index', {
      message: 'Welcome to my api'
    });
  }).post(userController.post);

  userRouter.route('/archive')
    .get(userController.get)
    .post(userController.removeItem);

  return userRouter;
};

module.exports = routes;

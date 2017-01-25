var express = require('express');

var routes = function(Book) {
  var userRouter = express.Router();
  var userController = require('../Controllers/userController')(Book);

  userRouter.route('/')
    .get(function(req, res) {
      if(!req.user) {
        res.redirect('auth/register');
      } else {
        res.render('index', {
          message: 'Hi ' + req.user.username,
          error: req.query.message,
          pageName: 'index'
        });
      }
      
      //console.log(req.query.message);

    });
    // .post(userController.post);

  userRouter.route('/archive')
    .get(userController.get);
    // .post(userController.removeItem);

  return userRouter;
};

module.exports = routes;

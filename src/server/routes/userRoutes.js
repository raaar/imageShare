var express = require('express');

var routes = function(Book) {
  var userRouter = express.Router();
  var userController = require('../controllers/userController')(Book);

  userRouter.route('/')
    .get(function(req, res) {
      var userData = {
        user: req.user.username
      }

      res.json(userData);
    });
    // .post(userController.post);

  // TODO: the archive/get path could be replaced by api/Books/
  userRouter.route('/archive')
    .get(userController.get);
    // .post(userController.removeItem);

  return userRouter;
};

module.exports = routes;

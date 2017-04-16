var express = require('express');
var multer  = require('multer');


var routes = function() {
  var userRouter = express.Router();
  var userController = require('../controllers/userController')();

  userRouter.route('/')
    .get(userController.get);

  userRouter.route('/avatar')
    .post(userController.post);
   
  return userRouter;
};

module.exports = routes;

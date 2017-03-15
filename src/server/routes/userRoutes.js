var express = require('express');
var multer  = require('multer');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('upload storage');
    cb(null, 'public/uploads/avatar');
  },

  filename: function (req, file, cb) {
    var fileTyle = file.mimetype;
    var ext = fileTyle.split('/');
    cb(null, Date.now() + "."+ ext[1] );
  }
});


var upload = multer({ storage: storage });


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

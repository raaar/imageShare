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

var routes = function(Book) {
  var userRouter = express.Router();
  var userController = require('../controllers/userController')();

  userRouter.route('/')
    .get(function(req, res) {
      var userData = {
        userName: req.user.username
      }
      console.log(userData);
      res.json(userData);
    });
    // .post(userController.post);

  // TODO: the archive/get path could be replaced by api/Books/
  userRouter.route('/archive')
    .get(userController.get);
    // .post(userController.removeItem);

  userRouter.route('/avatar')
    .post(upload.single('image'),
     userController.postAvatar);

  return userRouter;
};

module.exports = routes;

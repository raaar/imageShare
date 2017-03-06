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
    .get(userController.get);


  userRouter.route('/avatar')
    .patch(upload.single('image'),userController.patch);
   
       
    // .patch(function(req, res) {
    //   // delete the id so that it will not be overwritten on the database
    //   if(req.body._id)
    //     delete req.body._id;

    //   // looping through all the keys in the object
    //   for(var p in req.body) {
    //     req.book[p] = req.body[p];
    //   }

    //   req.book.save(function(err) {
    //     if(err)
    //       res.status(500).send(err);
    //     else
    //       res.json(req.book);
    //   });
    // })
  return userRouter;
};

module.exports = routes;

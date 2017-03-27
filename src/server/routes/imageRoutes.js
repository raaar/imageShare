var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

/*
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('upload storage');
    cb(null, 'public/uploads/images');
  },
  filename: function (req, file, cb) {
    var fileTyle = file.mimetype;
    var ext = fileTyle.split('/');
    cb(null, Date.now() + "."+ ext[1] );
  }
});

var upload = multer({ storage: storage });
*/

var routes = function() {

  var imageRouter = express.Router();
  var imageController = require('../controllers/imageController')();

  imageRouter.use(imageController.middleware);


  imageRouter.route('/')
//    .get(imageController.get) // this could be replaced by the more semantic 'fetch'.
    .post(imageController.post);

  imageRouter.route('/fetch')
    .get(imageController.get);


  // Middleware making the request to mongodb
  imageRouter.use('/:id', imageController.middlewareFetchSingle);

  imageRouter.route('/:id')
    .get(function(req, res){
      res.json(req.image);
    })
    .delete(imageController.destroyImage);


  return imageRouter;
};

module.exports = routes;

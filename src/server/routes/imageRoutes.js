var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
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


var routes = function() {

  var imageRouter = express.Router();
  var imageController = require('../controllers/imageController')();

  imageRouter.use(imageController.middleware);


  imageRouter.route('/')
    .get(imageController.get)
    .post(upload.single('image'), imageController.post);

  imageRouter.route('/')


  // Middleware making the request to mongodb
  imageRouter.use('/:id', imageController.middlewareFetchSingle);

  imageRouter.route('/:id')
    .get(function(req, res){
      res.json(req.image);
    })
    .delete(imageController.destroyImage);

  /*
  imageRouter.route('/:id/edit')
    .get(imageController.edit);

    
  imageRouter.route('/:id/update')
    .post(imageController.update);
  */

  return imageRouter;
};

module.exports = routes;

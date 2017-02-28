var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('upload storage');
    cb(null, 'public/uploads');
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


  imageRouter.route('/:id/edit')
    .get(imageController.edit);

    
  imageRouter.route('/:id/update')
    .post(imageController.update);

   
  // imageRouter.route('/:id/delete')
  //   .post(imageController.remove);

  // Middleware making the request to mongodb
  imageRouter.use('/:id', imageController.middlewareFetchSingle);

  imageRouter.route('/:id')
    .get(function(req, res){
      res.json(req.image);
    })
    .post(imageController.destroyImage);
    // .put(function(req, res) {
    //   req.book.title = req.body.title;
    //   req.book.author = req.body.author;
    //   req.book.genre = req.body.genre;
    //   req.book.read = req.body.read;
      
    //   req.book.save(function(err) {
    //     if(err)
    //       res.status(500).send(err);
    //     else
    //       res.json(req.book);
    //   });
    // })
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
    // .post(function(req, res) {
       /*      
       req.book.remove(function(err) {
         if(err)
           res.status(500).send(err);
         else
           // status 204 means item removed
           res.status(204).send('Removed');
       });
       */
    // });
  


  return imageRouter;
};

module.exports = routes;

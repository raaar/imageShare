var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;


var routes = function(Book) {

  var bookRouter = express.Router();
  var bookController = require('../Controllers/bookController')(Book);

  bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get);

  // Middleware making the request to mongodb
  bookRouter.use('/:bookId', function(req, res, next) {
    Book.findById(req.params.bookId, function(err, book) {
      if(err) {
        res.status(500).send(err);
      } else if(book) {
        req.book = book;
        next();
      } else {
        res.status(404).send('no book found');
      }
    });
  });

  bookRouter.route('/:bookId')
    .get(function(req, res){
      res.json(req.book);
    })
    .put(function(req, res) {
      req.book.title = req.body.title;
      req.book.author = req.body.author;
      req.book.genre = req.body.genre;
      req.book.read = req.body.read;
      req.book.save(function(err) {
        if(err)
          res.status(500).send(err);
        else
          res.json(req.book);
      });
    })
    .patch(function(req, res) {
      // delete the id so that it will not be overwritten on the database
      if(req.body._id)
        delete req.body._id;

      // looping through all the keys in the object
      for(var p in req.body) {
        req.book[p] = req.body[p];
      }

      req.book.save(function(err) {
        if(err)
          res.status(500).send(err);
        else
          res.json(req.book);
      });
    })
    .delete(function(req, res) {
      req.book.remove(function(err) {
        if(err)
          res.status(500).send(err);
        else
          // status 204 means item removed
          res.status(204).send('Removed');
      });
    });

  bookRouter.route('/:bookId/edit')
    .get(function(req, res) {
      var url = 'mongodb://localhost:27017/bookREST';
      var id = new objectId(req.params.id);
    });
    
  bookRouter.route('/:bookId/delete')
    .post(function(req, res) {
      var url = 'mongodb://localhost:27017/bookREST';
      var id = new objectId(req.params.bookId);

      mongodb.connect(url, function(err, db) {
        var collection = db.collection('books');
        collection.deleteOne(
          {_id: objectId.createFromHexString(req.params.bookId)},
          function(err, result) {
            res.redirect('/archive');
          }
        );
        
      });
    });

  return bookRouter;
};

module.exports = routes;

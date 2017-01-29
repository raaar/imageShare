var mongodb = require('mongodb').MongoClient;
var dbConfig = require('../config/db');

var userController = function(Book) {

  var get = function(req, res) {
    var url = dbConfig.url;

    mongodb.connect(url, function(err, db) {
      var collection = db.collection('images');
      collection.find({}).toArray(function(err, results) {
        if(err)
          res.status(500).send(err);
          
        if(!req.user) {
          res.redirect('auth/register');
        } else {
          res.render('archive', {
            items: results,
            pageName: 'archive'
          });
        }
      });
    });
    
    
    // Book.find('', function(err, books) {
    //   if(err)
    //     res.status(500).send(err);
    //   else
      
    //   if(!req.user) {
    //     res.redirect('auth/register');
    //   } else {
    //     res.render('archive', {
    //       books: books,
    //       pageName: 'archive'
    //     });
        
    //   }
    // });
  };

  // var post = function(req, res) {
  //     var book = new Book(req.body); // this works thanks to 'bodyParser';

  //     if(!req.body.title || !req.body.author) {
  //       // res.send('Missing information');
  //       res.status(400);
  //       res.render('index', {
  //         message: 'Missing information'
  //       });

  //     } else {
  //       book.save();
  //       res.status(201);

  //       Book.find('', function(err, books) {
  //         if(err)
  //           res.status(500).send(err);
  //         else
  //           res.redirect('archive');
  //       });
  //       //res.send(book);// 201: item created
  //     }
  // };


  // var removeItem = function(req, res) {
  //   // console.log('will delete this');
  //   console.log(req.params.id);


  //   Book.findById(req.body.id, function(err, book) {
  //     if(err) {
  //       res.status(500).send(err);
  //     } else if(book) {
  //       req.book = book;
  //       req.book.remove(function(err) {
  //         if(err)
  //           res.status(500).send(err);
  //         else
  //           res.status(204).send('Removed');
  //       });
  //     } else {
  //       res.status(404).send('no book found');
  //     }
  //   });
  // };

  return {
    get: get
    // post: post
  };
};

module.exports = userController;

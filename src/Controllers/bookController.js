// Reveal model pattern
var bookController = function(Book) {

  var post = function(req , res) {
    var book = new Book(req.body); // this works thanks to 'bodyParser';

    if(!req.body.title || !req.body.author) {
      // res.send('Missing information');
      res.status(400);
      res.render('index', {
        message: 'Missing information'
      });

    } else {
      book.save();
      res.status(201);
      res.send(book);// 201: item created
    }
  };

  var get = function(req, res){
    var query = {};

    if('title' in req.query) {
      query.title = req.query.title;
    }

    if ('genre' in req.query) {
      query.genre = req.query.genre;
    }

    Book.find(query, function(err, books) {
      if(err)
        res.status(500).send(err);
      else
        res.json(books);
    });
  };
  
  
  return {
    get: get,
    post: post
  };
};


module.exports = bookController;

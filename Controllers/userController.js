var userController = function(Book) {

  var get = function(req, res) {
    Book.find('', function(err, books) {
      if(err)
        res.status(500).send(err);
      else
        res.render('archive', {
          books: books
        });
    });
  };

  var removeItem = function(req, res) {
    console.log(req.body.id);

    Book.findById(req.body.id, function(err, book) {
      if(err) {
        res.status(500).send(err);
      } else if(book) {
        req.book = book;
        req.book.remove(function(err) {
          if(err)
            res.status(500).send(err);
          else
            res.status(204).send('Removed');
        });
      } else {
        res.status(404).send('no book found');
      }
    });

  };

  return {
    get: get,
    removeItem: removeItem
  };
};

module.exports = userController;

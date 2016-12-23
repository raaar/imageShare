var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


var db = mongoose.connect('mongodb://localhost/bookREST');

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

// TODO: see what this middlewhare does
app.use(bodyParser.urlencoded({encoded: true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api/Books', bookRouter);

app.get('/', function(req , res) {
  res.send('Welcome to my api');
});

app.listen(port, function(req, res){
  console.log('server running on port ' + port);
});

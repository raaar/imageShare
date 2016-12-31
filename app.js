/*
 Start project:
 1: sudo mongod
 2: gulp
*/

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
userRouter = require('./Routes/userRoutes')(Book);

app.use('/api/Books', bookRouter);
app.use('/', userRouter);

app.set('view engine', 'ejs');

// app.get('/', function(req , res) {
//   //res.send('Welcome to my api');
//   res.render('index', {
//     message: 'Welcome to my api'
//   });
// });


// app.get('/archive', function(req, res) {
//   res.render('archive', {
//     message: 'boo information'
//   });
// });

app.listen(port, function(req, res){
  console.log('server running on port ' + port);
});

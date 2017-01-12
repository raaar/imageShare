/*
 Start project:
 1: sudo mongod
 2: gulp
*/

var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');


var db = mongoose.connect('mongodb://localhost/bookREST');

var Book = require('./src/models/bookModel');
var User = require('./src/models/userModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(express.static('public')); // define where all static (CSS, JS) files come from
app.use(bodyParser.urlencoded({encoded: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'library'}));

// by assing 'app', we can use 'app.use' in our passport config file
require('./src/config/passport')(app);

var bookRouter = require('./src/Routes/bookRoutes')(Book);
var userRouter = require('./src/Routes/userRoutes')(Book);
var authRouter = require('./src/Routes/authRoutes')();

app.use('/api/Books', bookRouter);
app.use('/auth', authRouter);
app.use('/', userRouter);

app.set('views', './src/views');
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

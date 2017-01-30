/*
 Start project:
 1: sudo mongod
 2: gulp
*/

var express = require('express'),
    bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');


// var db = mongoose.connect('mongodb://localhost/bookREST');
// var Book = require('./src/models/bookModel'); // Old model once used for Mongooe
// var User = require('./src/models/userModel'); // old model once used for mongoose

var app = express();

var port = process.env.PORT || 3000;

app.use(express.static('public')); // define where all static (CSS, JS) files come from
app.use(bodyParser.urlencoded({encoded: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'library'}));

// by assing 'app', we can use 'app.use' in our passport config file
require('./src/server/config/passport')(app);

var imageRouter = require('./src/server/routes/imageRoutes')();
var userRouter = require('./src/server/routes/userRoutes')();
var authRouter = require('./src/server/routes/authRoutes')();

app.use('/api/Images', imageRouter);
app.use('/auth', authRouter);
app.use('/', userRouter);

app.set('views', './src/server/views');
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

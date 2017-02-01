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
var profileRouter = require('./src/server/routes/profileRoutes')();
var signInStatus = require('./src/server/middleware/middleware');


app.use('/api/Images', imageRouter);
app.use('/auth', authRouter);
app.use('/', signInStatus);
app.use('/', userRouter);
app.use('/api/profile', profileRouter);


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



/*
  TODO:
  
  remember me
  profile
  comments on images
*/
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

var mongodb = require("mongodb");
var dbUrl = require('./src/server/config/db');

var app = express();

var port = process.env.PORT || 7777;
//var port = 7777;
//console.log(process.env.PORT);

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


app.use('/api/images', imageRouter);
app.use('/auth', authRouter);
app.use('/', signInStatus);
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);


app.set('views', './src/server/views');
app.set('view engine', 'ejs');

app.get('/', function(req , res) {
  res.render('index');
});


var db;


// Connect to the database before starting the application server.
mongodb.MongoClient.connect( dbUrl , function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  app.listen(port, function(req, res){
    console.log('server running on port ' + port);
  });
});

/*
  TODO:
  remember me
  comments on images
*/

/*
 *
  Deployment and Mlab setup:
  https://www.sitepoint.com/deploy-rest-api-in-30-mins-mlab-heroku/

  MONGODB_URI_IMAGESHARE (mlab url variable:
  heroku config:set MONGODB_URI=mongodb://raf:IMAGEshare@ds119220.mlab.com:19220/imageshare

 HEROKU
 Pushing: 
 git push -f heroku react:master

 URL: https://frozen-caverns-72254.herokuapp.com/#/
*/

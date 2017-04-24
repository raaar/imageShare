/*
  
  START PROJECT COMMANDS:
  heroku local (conncets to Mlab and AWS: http://localhost:5000)
  npm start serve (starts Webpack SCSS and JS watcher: http://localhost:3000)
  npm start build (bulds project for production)
  
  
  ENVIROMENT VARIABLES:
  Copy and remname to '.env' the '.env-sample'. Fill the AWS and MLAB enviroment vars
  
  
  DEPLOIMENT AND MLAB SETUP:
  https://www.sitepoint.com/deploy-rest-api-in-30-mins-mlab-heroku/


  HEROKU:
  Pushing:
  git push -f heroku react:master


  LOGS:
  heroku logs --tail:


  URL:
  https://frozen-caverns-72254.herokuapp.com/

  
  AS3 LAMBDA IMAGE RESIZE TUTORIAL:
  https://aws.amazon.com/blogs/compute/resize-images-on-the-fly-with-amazon-s3-aws-lambda-and-amazon-api-gateway/
 

  ERRORS:
  If Heroku local wont start:
  try 'killall node'

*/


var dotenv = require('dotenv');
dotenv.load();
var express = require('express'),
    bodyParser = require('body-parser');
var path = require('path');

var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var mongodb = require("mongodb");
var dbUrl = process.env.MONGODB_URI;

var app = express();

var port = process.env.PORT || 7777;
console.info('env: ', process.env.NODE_ENV);

var db;


// S3 setup
var s3Sign = require('./routes/s3Routes');

var morgan = require('morgan');

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));


// static files folder
app.use(express.static(path.resolve(__dirname,  '../build')));


app.use(bodyParser.urlencoded({encoded: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'library'}));

// by passing 'app', we can use 'app.use' in our passport config file
require('./config/passport')(app);

var imageRouter = require('./routes/imageRoutes')();
var folderRouter = require('./routes/folderRoutes')();
var userRouter = require('./routes/userRoutes')();
var authRouter = require('./routes/authRoutes')();
var previewRouter = require('./routes/previewRoutes')();
var profileRouter = require('./routes/profileRoutes')();


app.use('/api/images', imageRouter);
app.use('/auth', authRouter);
app.use('/api/preview', previewRouter);
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/folders', folderRouter);


app.get('/api/sign-s3', s3Sign);

app.get('/*', function(req , res) {
  res.sendFile(path.resolve( __dirname,  '../build', 'index.html'));
});


// enstablish connection with mongodb
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
/*
 Start project:
 1: sudo mongod
 2: gulp
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
var dbUrl = require('./src/server/config/db');

var app = express();

var port = process.env.PORT || 7777;
console.info('env: ', process.env.NODE_ENV);

var db;


// S3 setup
var s3Sign = require('./src/server/routes/s3Routes');

var morgan = require('morgan');
// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));



//app.use(express.static('public')); // define where all static (CSS, JS) files come from
app.use(express.static(path.resolve(__dirname,  'build')));


app.use(bodyParser.urlencoded({encoded: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'library'}));

// by passing 'app', we can use 'app.use' in our passport config file
require('./src/server/config/passport')(app);

var imageRouter = require('./src/server/routes/imageRoutes')();
var folderRouter = require('./src/server/routes/folderRoutes')();
var userRouter = require('./src/server/routes/userRoutes')();
var authRouter = require('./src/server/routes/authRoutes')();
var profileRouter = require('./src/server/routes/profileRoutes')();
var signInStatus = require('./src/server/middleware/middleware');


app.use('/api/images', imageRouter);
app.use('/auth', authRouter);
//app.use(/^((?!\/preview).)*$/, signInStatus);
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/folders', folderRouter);

//app.set('views', './src/server/views');
//app.set('view engine', 'ejs');




app.get('/*', function(req , res) {
  res.sendFile(path.resolve(__dirname,  'build', 'index.html'));
});


/*
app.get('/preview', function(req , res) {
  console.log('app.get /preview');
  res.redirect('/network');
  //res.json('hello preview');
});
*/
/*
app.get('/*', function(req , res) {
  res.redirect('/');
});
*/

app.get('/sign-s3', s3Sign);



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
  
  START PROJECT:
  heroku local, navigate to http://localhot:5000
  

  
  Deployment and Mlab setup:
  https://www.sitepoint.com/deploy-rest-api-in-30-mins-mlab-heroku/

  MONGODB_URI_IMAGESHARE (mlab url variable:
  heroku config:set MONGODB_URI=mongodb://raf:IMAGEshare@ds119220.mlab.com:19220/imageshare

  HEROKU
  Pushing: 
  git push -f heroku react:master

  Logs:
  heroku logs --tail:

  URL: https://frozen-caverns-72254.herokuapp.com/#/

  Heroku local not tarting:
  try run 'killall node'

*/



/* AS3 Lambda image resize tutorial:
 * https://aws.amazon.com/blogs/compute/resize-images-on-the-fly-with-amazon-s3-aws-lambda-and-amazon-api-gateway/
 */


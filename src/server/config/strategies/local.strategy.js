var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient,
    dbUrl = require('../db');

var strategyFunction = function() {
    passport.use(new LocalStrategy({
      usernameField: 'signInUserName', // corresponds to the name on our index.ejs template
      passwordField: 'signInPassword'
    },
    function(username, password, done) {

        console.info('username: ',username);

        mongodb.connect(dbUrl, function (err, db) {
            var collection = db.collection('users');

            collection.findOne({
                    username: username
                },
                function (err, results) {
                  if(err) { return done(err); }

                  if (null !== results) {
                    if(results.password === password ) {
                      var user = results;
                      console.log('Password is correct');
                      done(null, user);
                    } else {
                      done(null, false, {message: 'Bad password'});
                    }
                  } else {
                    done(null, false, {message: 'User does not exist'});
                  }
                }
            );
        });

    }));
};

module.exports = strategyFunction;

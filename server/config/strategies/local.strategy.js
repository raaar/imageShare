var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient,
    dbUrl = process.env.MONGODB_URI,
    bcrypt = require('bcrypt');

var strategyFunction = function() {
    passport.use(new LocalStrategy({
      usernameField: 'username', // second field correspons to the object passed by React from authActions 
      passwordField: 'password'
    },
    function(username, password, done) {

        console.info('username: ',username);
        var pw = password;

        mongodb.connect(dbUrl, function (err, db) {
            var collection = db.collection('users');

            collection.findOne({
                    username: username
                },
                function (err, results) {
                  if(err) { return done(err); }

                  if (null !== results) {

                    // TODO: some users don't have encrypted passwords
                    // if password is not encrypted, they are still able to log in
                    if(results.salt) {
                      pw =  bcrypt.hashSync(password, results.salt);
                    }

                    if(results.password === pw ) {
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

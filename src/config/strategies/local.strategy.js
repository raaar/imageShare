var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

var strategyFunction = function() {
    passport.use(new LocalStrategy({
      usernameField: 'userName', // corresponds to the name on our index.ejs template
      passwordField: 'password'
    },
    function(username, password, done) {
        var url = 'mongodb://localhost:27017/libraryApp';

        console.info('UN:', username);

        // Replace with mongoose call
        mongodb.connect(url, function (err, db) {
          var collection = db.collection('users');
          
          console.info('UN2:', username);
        
            
            collection.findOne({
                    userName: username
                },
                function (err, results) {
                  
                  if(err) { return done(err); }
  
                  console.log(results);

                  if (null != results) {
                    if(results.password === password ) {
                      var user = results;
                      console.log('Password is correct');
                      done(null, user);
                    } else {
                      console.log('Bad login details')
                      done(null, false, {message: 'Bad password'});
                    }
                  } else {
                    console.log('Bad login details')
                    done(null, false, {message: 'User does not exist'});
                  }
                }
            );
        });

    }));
};

module.exports = strategyFunction;

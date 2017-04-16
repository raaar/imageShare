var passport = require('passport');

var passportFunction = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done){
      // null as there are no errors to report
      done(null, user);
    });

    passport.deserializeUser(function(user, done){
      // null as there are no errors to report
      done(null, user);
    });

    require('./strategies/local.strategy')();

};

module.exports = passportFunction;

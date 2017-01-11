var authController = function(User) {
  var get = function(req, res){
    res.render('register', {
      message: 'Register'
    })
  };
  
  var post = function(req, res) {
      var user = new User(req.body); // this works thanks to 'bodyParser';

      if(!req.body.userName || !req.body.password) {
        res.status(400);
        res.render('register', {
          message: 'Missing information'
        });
      } else {
        
        console.log('Registration succesfull, redirecting');
        console.info(user.email + " " + user.password);
        user.save();
        res.status(201);
        //res.send(user); // Some form of redirect
        res.render('signIn', {
          message: 'Registration successful, now log in'
        });
      }
      // passport log in code
    }
    
    
  return {
    get:get,
    post:post
  }
}

module.exports = authController;
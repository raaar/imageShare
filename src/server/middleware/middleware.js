var middleware = function(req, res, next) {
  if(req.user) {
    // console.log('user is logged in');
    next();
  } else {
    // console.log('user is logged out');
    res.redirect('/auth/register');
  }
}


module.exports = middleware;
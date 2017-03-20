var middleware = function(req, res, next) {
  if(req.user) {
    // console.log('user is logged in');
    //res.redirect('/');
    next();
  } else {
    // console.log('user is logged out');
    res.redirect('/auth');
  }
}


module.exports = middleware;

var middleware = function(req, res, next) {

  // TODO: make the regex stronger
  var previewUrlRegExp = new RegExp("/preview");

  /*
  if(req.user) {
    // user is logged in
    next();
  } else {
    // user is logged out
    res.redirect('/auth');
  }
  */
  console.info('user: ', req.user);
  console.info('url: ', req.url);
  
  next();
}

/*
  if(previewUrlRegExp.test(req.url)){
    console.log( req.url + ' redirect to preview gallery');
    next();
  }
*/

module.exports = middleware;

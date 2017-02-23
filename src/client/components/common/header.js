"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Header = React.createClass({
  
  // A link to root is assigned with to="app"
  
  render: function() {
    return (
      
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          
          <Link to="app" className="navbar-brand">
            <img src="images/logo.jpg" width="40"/>
          </Link>
          
          <ul className="nav navbar-nav">
            <li><Link to="app">Home</Link></li>
            <li><Link to="profile" params={{author: "5@5.com"}} >Profile</Link></li>
            <li><Link to="upload">Upload</Link></li>
          </ul>
        
        </div>
      </nav>
      
      );
  }
  
});


module.exports = Header;

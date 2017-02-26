"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var UserStore = require('../../stores/userStore');

var Header = React.createClass({
  
  getInitialState: function() {
    return {
     user: "" 
    };
  },

  componentDidMount: function() {

    if(this.isMounted()) {

    }
  },
  
	componentWillMount: function() {
    this.setState({user: UserStore.getUser() });
		UserStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		UserStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({user: UserStore.getUser() });
	},

  render: function() {

    var userObject = UserStore.getUser(); 
    console.info("header render: ", userObject);

    var testObj = {
      author: "5@5.com" 
    }
    
    return (
      
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          
          <Link to="my-profile" params={ testObj } className="navbar-brand">
            <img src="images/logo.jpg" width="40"/>
          </Link>
          
          <ul className="nav navbar-nav">
            <li><Link to="app">Home</Link></li>
            <li><Link to="upload">Upload</Link></li>
          </ul>
        
        </div>
      </nav>
      
    );
  }
  
});

module.exports = Header;

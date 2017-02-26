"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var UserStore = require('../../stores/userStore');

var Header = React.createClass({
  
  getInitialState: function() {
    return {
     user: []
    };
  },

  componentDidMount: function() {

    if(this.isMounted()) {
      this.setState({user: UserStore.getUser() });

    }
  },
  
	componentWillMount: function() {
		UserStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		UserStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({user: UserStore.getUser() });
	},

  render: function() {


    console.info('mounted user: ', this.state.user);
    var userNameTest = "5@5.com";

    var testObj = {
      author: userNameTest
    }
    
    console.log(testObj);

    return (
      
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          
          <Link to="profile" params={ testObj } className="navbar-brand">
            <img src="images/logo.jpg" width="40"/>
          </Link>
          
          <ul className="nav navbar-nav">
            <li><Link to="app">Home</Link></li>
            <li><Link to="profile" params={{author: "5@5.com"}} >Profile</Link></li>
            <li><Link to="upload">Upload</Link></li>
            <li>logged in as: {this.state.user.userName}</li>
          </ul>
        
        </div>
      </nav>
      
    );
  }
  
});

module.exports = Header;

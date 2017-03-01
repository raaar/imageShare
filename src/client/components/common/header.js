"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var UserStore = require('../../stores/userStore');

var Header = React.createClass({

  getInitialState: function() {
    return {
      user: {}
    };
  },

  componentDidMount: function() {
    var user = UserStore.getUser()
 
    if(this.isMounted()) {
      this.setState({
        user: user 
      })
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

    return (
      
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          
          <Link to="my-profile" className="navbar-brand">
            <img src={this.state.user.avatarSmall} />
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

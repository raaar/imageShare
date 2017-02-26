'use strict';

var React = require('react');
var ProfileStore = require('../../stores/profileStore');
var UserStore = require('../../stores/userStore');
var Router = require('react-router');

var Profile = React.createClass({

  mixins: [
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      profile: {
      }
    };
  },
        
  componentDidMount: function() {
    var author = this.props.params.author;
    var user = UserStore.getUser(); // logged in user


    if(this.isMounted()) {
      
      this.setState({
        profile: ProfileStore.getProfile(author),
      });

      if(user.userName === author) {
        this.transitionTo('my-profile')
      }
    }
  },

	// The following are important lines responsible for page refresh when the data changes. Wothout them, the view would not refresh when we delete an item
	componentWillMount: function() {
		ProfileStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ProfileStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    this.setState({profile: ProfileStore.getProfile(author) });
	},

  render: function() {

    return (
        <div>
          <h1>{this.state.profile}</h1>
          User profile
        </div>
      );
  }
});

module.exports = Profile;

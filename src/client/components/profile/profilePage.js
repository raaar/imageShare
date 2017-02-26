'use strict';

var React = require('react');
var ProfileStore = require('../../stores/profileStore');
var UserStore = require('../../stores/userStore');

var Profile = React.createClass({

  getInitialState: function() {
    return {
      profile: {
      },
      own: false
    };
  },

  componentDidMount: function() {
    console.info('profile params: ', this.props.params);
    var author = this.props.params.author;
    var user = UserStore.getUser(); // logged in user

    if(this.isMounted()) {
      
      this.setState({
        profile: ProfileStore.getProfile(author),
      });

      if(user.userName === author) {
        this.setState({
          own: true
        });
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
    var self = this;

    var profile = function() {
      if(self.state.own === true) {
        return (
          <div>
            My Profile      
          </div>
        );
      } else {
        return (
          <div>
            User profile
          </div>
        );
      }
    };

    return (
        <div>
          <h1>{this.state.profile}</h1>
          {profile()}
        </div>
      );
  }
});

module.exports = Profile;

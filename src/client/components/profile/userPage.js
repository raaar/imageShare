
'use strict';

var React = require('react');
var UserStore = require('../../stores/userStore');

var UserProfile = React.createClass({

  getInitialState: function() {
    return {
      user: {
      },
      own: false
    };
  },

  componentDidMount: function() {
    var user = UserStore.getUser(); // logged in user

    if(this.isMounted()) {
      this.setState({
        user: UserStore.getUser(),
      });
    }
  },

	// The following are important lines responsible for page refresh when the data changes. Wothout them, the view would not refresh when we delete an item
	componentWillMount: function() {
		ProfileStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		UserStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    this.setState({profile: UserStore.getUser() });
	},

  render: function() {
    return (
      <div>
        <h1>User profile/h1>
      </div>
    );
  }
});

module.exports = UserProfile

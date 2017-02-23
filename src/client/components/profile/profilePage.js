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
    var author = this.props.params.author;
        
    if(this.isMounted()) {
      
      this.setState({
        profile: ProfileStore.getProfile(author),
      });

      // create conditional to check if the profile viewed belongs to the user

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
    // console.info('on change ', this.state.images );
	},

  render: function() {
    console.log(this.state.own);

    return (
        <div>
          <h1>{this.state.profile}</h1>
          <p>Profile info</p>  
        </div>
      );
  }
});

module.exports = Profile;

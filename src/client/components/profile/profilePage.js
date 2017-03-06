'use strict';

var React = require('react');
var ProfileStore = require('../../stores/profileStore');
var UserStore = require('../../stores/userStore');
var Router = require('react-router');
var ImageActions = require('../../actions/imageActions');
var ImageGrid = require('../image/imageGrid');
var ImageStore = require('../../stores/imageStore');

var Profile = React.createClass({

  mixins: [
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      profile: {},
      images: []
    };
  },
        
  componentDidMount: function() {
    var author = this.props.params.author;
    var user = UserStore.getUser(); // logged in user

    ImageActions.userImages(author);

    if(this.isMounted()) {
      if(user.userName === author) {
        this.transitionTo('my-profile')
      }

      this.setState({
        images: ImageStore.getUserImages()
      });
    }
  },

	// The following are important lines responsible for page refresh when the data changes. Wothout them, the view would not refresh when we delete an item
	componentWillMount: function() {
		ProfileStore.addChangeListener(this._onChange);
		ImageStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ProfileStore.removeChangeListener(this._onChange);
		ImageStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    this.setState({
      images: ImageStore.getUserImages()
    });
	},

  render: function() {
    return (
      <div>
        <h1>{this.state.profile}</h1>

        Author profile

        <ImageGrid images={this.state.images} />
      </div>
    );
  }
});

module.exports = Profile;

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
    var currentRoutes = this.context.router.getCurrentRoutes();

    ImageActions.authorImages(author, currentRoutes[1].name);

    if(this.isMounted()) {
      if(user.userName === author) {
        this.transitionTo('my-profile')
      }

      this.setState({
        images: ImageStore.getAuthorImages() 
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
      images: ImageStore.getAuthorImages()
    });
	},

  render: function() {
    return (
      <div>
        <div className="mast">
          <div className="container-fluid">
            <h3>Images by: {this.props.params.author}</h3> 
          </div>
        </div>
        <ImageGrid images={this.state.images} />
      </div>
    );
  }
});

module.exports = Profile;
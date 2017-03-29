'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ImageActions = require('../actions/imageActions');
var ImageStore = require('../stores/imageStore');
var ImageGridContainer = require('./image/imageGridContainer');
var ModalGallery = require('./common/modalGallery');

var Home = React.createClass({
  
  getInitialState: function() {
    return {
     images: []
    };
  },

  componentDidMount: function() {
    ImageActions.setImageQuery({}); // Filters used by modal. Reset image filters on homepage

    if(this.isMounted()) {
      this.setState({
        images: ImageActions.loadImages({limit: 20})
      });
    }
  },

	// The following are important lines responsible for page refresh when the data changes. Wothout them, the view would not refresh when we delete an item
	componentWillMount: function() {
		ImageStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ImageStore.removeChangeListener(this._onChange);
    ImageStore.clearImages();
	},

	_onChange: function() {
		this.setState({
      images: ImageStore.getImages()
    });
	},


  getGrid: function() {
    if(this.state.images && this.state.images.length) {
      return (
        <ImageGridContainer images={this.state.images} gridSize="large" />
      )
    }
  },


  render: function() {
    return (
        <div>
          {this.getGrid()}
        </div>
      );
  }
});

module.exports = Home;

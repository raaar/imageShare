'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ImageActions = require('../actions/imageActions');
var ImageStore = require('../stores/imageStore');
var ImageGrid = require('./image/imageGrid');
var ModalGallery = require('./common/modalGallery');

var Home = React.createClass({
  
  getInitialState: function() {
    return {
     images: [],
     filters: {}
    };
  },

  componentDidMount: function() {
    ImageActions.setImageFilters({}); // Filters used by modal. Reset image filters on homepage

    if(this.isMounted()) {
      this.setState({
        images: ImageStore.getAllImages(),
        filters: ImageStore.getFilters()
      });
    }
  },

	// The following are important lines responsible for page refresh when the data changes. Wothout them, the view would not refresh when we delete an item
	componentWillMount: function() {
		ImageStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ImageStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({
      images: ImageStore.getAllImages(),
      filters: ImageStore.getFilters()
    });
	},

  render: function() {
    return (
        <div>
          <ImageGrid images={this.state.images} gridSize="large" />
        </div>
      );
  }
});

module.exports = Home;

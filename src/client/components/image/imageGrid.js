'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ModalActions = require('../../actions/modalActions');

var ImageGrid = React.createClass({
  
  propTypes: {
    images: React.PropTypes.array.isRequired
  },

// set initial state here
  getInitialState: function() {
    return {
      image: {
        image: {
          avatar: ""
        }         
      }   
    }
  },

  openImage: function(image, e) {
    e.preventDefault();
    ModalActions.showModal(image);
  },

  render: function() {

    var createImageTile = function(image) {
//      var src = "uploads/images/" + image.image.thumb;
      var src = "http://imageshareuploads.s3-website-eu-west-1.amazonaws.com/280x280/" + image.image.full;
      var tileClass = "tile";

      if(this.props.gridSize === "large") {
        tileClass = "tile--lg";
      }

      return (
        <div key={image._id} >
          <a href="#" onClick={this.openImage.bind(this, image)} >
            <img className={tileClass} src={src} />
          </a>
        </div>
      );
    }

    return (
      <div>
	  		{this.props.images.map(createImageTile, this)}
      </div>
    );
  }
});


module.exports = ImageGrid;

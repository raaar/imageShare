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
      
/*
      if (image.image === undefined) {
        console.log('image is undefined'); 

        var image = {
          _id: "666",
          image: {
            thumb: "placeholder.jpeg"
          }
        }
      }       
*/
      var src = "uploads/images/" + image.image.thumb;
      var tileClass = "tile";

      if(this.props.gridSize === "large") {
        tileClass = "tile--lg";
      }
          /* 
          <Link to="image" params={{id: image._id}} >
            <img className={tileClass} src={src} />
          </Link>
          */
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

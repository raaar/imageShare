'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var ImageGrid = React.createClass({
  
  propTypes: {
    images: React.PropTypes.array.isRequired
  },

  render: function() {

    var createImageTile = function(image) {

      var src = "uploads/" + image.image.thumb;

      return (
        <div key={image._id}>
          <Link to="image" params={{id: image._id}} >
            <img className="tile" src={src} />
          </Link>
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

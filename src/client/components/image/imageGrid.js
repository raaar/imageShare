'use strict';

var React = require('react');

var ImageGrid = React.createClass({
  
  propTypes: {
    images: React.PropTypes.array.isRequired
  },

  render: function() {

    var createImageTile = function(image) {
      //console.log(image);
      
      var url = "uploads/" + image.image.thumb;
      console.log(url);

      return (
        <div key={image._id}>
          <img src={url} />
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

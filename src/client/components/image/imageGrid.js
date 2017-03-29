var React = require('react');
var config = require('../../../../config');


var ImageGrid = React.createClass({

  createImageTile: function(image, i) {
    if(!image)
      return;

    var src = config.thumbSquareLarge + image.image.file;
    var tileClass = "tile";

    if(this.props.gridSize === "large") {
      tileClass = "tile--lg";
    }


    return (
      <div key={image._id}>
        <a href="#" onClick={this.props.openImage.bind(null, i)}>
          <img className={tileClass} src={src} />
        </a>
      </div>
    );
  },


  render: function() {
    return (
      <div id="js-grid" className="grid">
	  		{this.props.images.map(this.createImageTile, this)}
      </div>
    );
  }

});
  
module.exports = ImageGrid;

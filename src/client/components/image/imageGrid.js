var React = require('react');
var config = require('../../../../config');


var ImageGrid = React.createClass({

  createImageTile: function(image, i) {
    if(!image) {
      return;
    }

    var src = config.thumbSquareLarge + image.image.file;
    var tileClass = "tile";

    if(this.props.gridSize === "large") {
      tileClass = "tile tile--lg";
    }


    return (
      <div key={image._id}>
        <a href="#" onClick={this.props.openImage.bind(null, i)}>
          <div className={tileClass}>
            <img  src={src} />
          </div>
        </a>
      </div>
    );
  },


  render: function() {
    var gridClass = this.props.modifiers ?  "grid " + this.props.modifiers : "grid";

    return (
      <div id="js-grid" className={gridClass}>
			  {this.props.images.map(this.createImageTile, this)}
      </div>
    );
  }

});
  
module.exports = ImageGrid;

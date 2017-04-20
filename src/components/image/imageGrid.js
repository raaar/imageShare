import React, {Component} from 'react';
const config = require('../../../config');




function createImageTile(image, i) {
  if(!image) {
    return;
  }

  var src = config.thumbSquareLarge + image.image.file;
  var tileClass = "tile";

  if(this.props.size === "large") {
    tileClass = "tile tile--lg";
  }


  return (
    <div key={image._id}>
      <div className={tileClass}>
        <a href="#" onClick={this.handleClick.bind(this, i)}>
          <img src={src} alt={image.title} />
        </a>
      </div>
    </div>
  );
}




class ImageGrid extends Component{
  
  handleClick(i, e) {
    e.preventDefault();
    this.props.openImage(i);
  }

  render() {

    var gridClass = this.props.modifiers ?  "grid " + this.props.modifiers : "grid";

    return (
      <div id="js-grid" className={gridClass}>
			  {this.props.images.map(createImageTile, this)}
      </div>
    );
  }

};
  
export default ImageGrid;

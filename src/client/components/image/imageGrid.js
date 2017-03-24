'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ModalActions = require('../../actions/modalActions');
var ImageActions = require('../../actions/imageActions');
var config = require('../../../../config');

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
      },
      end: false
    }
  },


  openImage: function(image, e) {
    e.preventDefault();
    ModalActions.showModal(image);
  },


  loadMore: function() {
    var lastItem = this.props.images[this.props.images.length -1];
    ImageActions.loadMoreImages( { after : lastItem._id } );
  },


  componentWillReceiveProps: function(nextProps) {
    var oldLastItem = this.props.images[this.props.images.length - 1];
    var newLastItem = nextProps.images[nextProps.images.length - 1];

    if( oldLastItem && oldLastItem  === newLastItem ) {
      this.setState({
        end: true
      });
    }
  },


  render: function() {
    var btnClass = this.state.end ? "btn hide" : "btn" ;


    var createImageTile = function(image) {
      var src = config.thumbSquareLarge + image.image.file;
      var tileClass = "tile";

      if(this.props.gridSize === "large") {
        tileClass = "tile--lg";
      }

      return (
        <div key={image._id} >
          <a href="#" onClick={this.openImage.bind(this, image)}>
            <img className={tileClass} src={src} />
          </a>
        </div>
      );
    }


    return (
      <div>
	  		{this.props.images.map(createImageTile, this)}
        <div className="load-more">
          <button className={btnClass} onClick={this.loadMore}>Load more</button>
        </div>    
      </div>
    );
  }
});


module.exports = ImageGrid;

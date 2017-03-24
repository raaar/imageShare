'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var _ = require('lodash');
var ModalActions = require('../../actions/modalActions');
var ImageActions = require('../../actions/imageActions');
var ImageStore = require('../../stores/imageStore');
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
      end: false,
      previousPosition: window.pageYOffset
    }
  },


  openImage: function(image, e) {
    e.preventDefault();
    ModalActions.showModal(image);
  },


  loadMore: function() {
    // get the search query parameters from store
    var imageQuery = ImageStore.getImageQuery();

    // only make ajax call if there are images available on the DB
    if(!this.state.end) {
      var lastItem = this.props.images[this.props.images.length -1];
      var query = { after : lastItem._id }
      
      // add any search queries to the request 
      if(Object.keys(imageQuery).length)
        Object.assign(query, imageQuery);
        
      console.info('the query: ', query);
      ImageActions.loadImages( query );
    }
  },


  handleScroll: function(event) {
    var pageHeight = document.documentElement.scrollHeight;
    var clientHeight = document.documentElement.clientHeight;
    var currentPosition = window.pageYOffset;


    if (this.state.previousPosition > currentPosition) {
      //console.log('scrolling up');
    } else {
      //console.log('scrolling down');
      if (pageHeight - (currentPosition + clientHeight) < 50) {
        console.log('update items function');
        this.loadMore();
      }
    }

    this.setState({
      previousPosition: currentPosition
    })
  },


  componentWillReceiveProps: function(nextProps) {
    if(nextProps.images) {
    
      var oldLastItem = this.props.images[this.props.images.length - 1];
      var newLastItem = nextProps.images[nextProps.images.length - 1];
    }

    // Check if all the images have been loaded
    if( oldLastItem && oldLastItem  === newLastItem ) {
      window.removeEventListener("scroll", this.handleScroll);

      this.setState({
        end: true
      });
    }
  },
  

  componentDidMount: function() {
    window.addEventListener("scroll", _.debounce(this.handleScroll, 500 ) );
  },


  componentWillUnmount: function() {
    window.removeEventListener("scroll", _.debounce(this.handleScroll));
  },


  render: function() {
    var btnClass = this.state.end ? "btn hide" : "btn" ;

    var createImageTile = function(image) {
      if(!image)
        return;

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
        <div className="load-more container-fluid">
          <button className={btnClass} onClick={this.loadMore}>Load more</button>
        </div>    
      </div>
    );
  }
});


module.exports = ImageGrid;

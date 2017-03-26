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
      end: false, // might not need this logic
      previousPosition: window.pageYOffset
    }
  },


  openImage: function(image, i, e) {
    e.preventDefault();
    ModalActions.showModal(image, i);
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


  loadItemsFirstTime: function() {
    // Load just enough items to fill the whole page.
    // Called twice: by componentDidMount and componentDidUpdate
    var grid = document.getElementById('grid');
    var gridHeight = grid.offsetHeight;
    var clientHeight = document.documentElement.clientHeight;
  
    if( gridHeight < clientHeight ) {
      console.info('component did update');
      this.loadMore(); 
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
      if (pageHeight - (currentPosition + clientHeight) < 50 ) {
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

      //this.setState({
        //end: true
      //});
    }
  },

  
  

  componentDidUpdate: function() {
    this.loadItemsFirstTime(); 
  },


  componentDidMount: function() {
    this.loadItemsFirstTime(); 
    window.addEventListener("scroll", _.debounce(this.handleScroll, 500 ) );
  },




  componentWillUnmount: function() {
    window.removeEventListener("scroll", _.debounce(this.handleScroll));
  },


  render: function() {

    var createImageTile = function(image, i) {
      if(!image)
        return;

      var src = config.thumbSquareLarge + image.image.file;
      var tileClass = "tile";

      if(this.props.gridSize === "large") {
        tileClass = "tile--lg";
      }

      return (
        <div key={image._id} >
          <a href="#" onClick={this.openImage.bind(this, image, i)}>
            <img className={tileClass} src={src} />
          </a>
        </div>
      );
    }


    return (
      <div id="grid">
	  		{this.props.images.map(createImageTile, this)}
      </div>
    );
  }
});


module.exports = ImageGrid;

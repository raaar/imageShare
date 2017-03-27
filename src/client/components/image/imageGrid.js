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
      gridFillsPage: false,
      previousPosition: window.pageYOffset
    }
  },


  openImage: function(image, i, e) {
    e.preventDefault();
    ModalActions.showModal(i);
  },


  loadMore: function() {
    // get the search query parameters from store
    var imageQuery = ImageStore.getImageQuery();

    // only make ajax call if there are images available on the DB
    var lastItem = this.props.images[this.props.images.length -1];
    var query = { after : lastItem._id }
      
    // add any search queries to the request 
    if(Object.keys(imageQuery).length)
      Object.assign(query, imageQuery);
        
    ImageActions.loadImages( query );
  },


  loadItemsFirstTime: function() {
    // Load just enough items to fill the whole page.
    // Called twice: by componentDidMount and componentDidUpdate
    var grid = document.getElementById('js-grid');
    var gridHeight = grid.offsetHeight;
    var clientHeight = document.documentElement.clientHeight;
  
    if( gridHeight < clientHeight ) {
      this.loadMore(); 
    } else {
      this.setState({
        gridFillsPage: true    
      })    
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
      if (pageHeight - (currentPosition + clientHeight) < clientHeight ) {

        this.loadMore()
      }
    }

    if(this.isMounted()) {
      this.setState({
        previousPosition: currentPosition
      });
    }
  },


  componentDidMount: function() {
    if(this.isMounted()) {
      this.loadItemsFirstTime(); 
      window.addEventListener("scroll", _.debounce(this.handleScroll, 500 ) );
    }
  },


  componentDidUpdate: function() {
    // check if the grid fills the whole page
    if(!this.state.gridFillsPage) {
      this.loadItemsFirstTime(); 
    }
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
      <div id="js-grid" className="grid">
	  		{this.props.images.map(createImageTile, this)}
      </div>
    );
  }
});


module.exports = ImageGrid;

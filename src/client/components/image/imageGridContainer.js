'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var _ = require('lodash');
var ModalActions = require('../../actions/modalActions');
var ImageActions = require('../../actions/imageActions');
var ImageStore = require('../../stores/imageStore');
var ImageGrid = require('./imageGrid');
var Spinner = require('../common/spinner');

var ImageGridContainer = React.createClass({
  
  propTypes: {
    query: React.PropTypes.object
  },


  getInitialState: function() {
    return {
      end: false,
      images: [],
      loading: true
    }
  },


  previousPosition: window.pageYOffset, // determine if scrolling up or down
  gridFillsPage: false,


	componentWillMount: function() {
		ImageStore.addChangeListener(this._onChange);
    window.addEventListener("scroll", _.debounce(this.handleScroll, 250 ) );
	},


  componentDidMount: function() {
    // We pass the image query to the store, so that it can be retrieved by the modal.
    // We must pass the query so that the modal can load more images while navigating with the 
    // right arrow key
    ImageActions.setImageQuery(this.props.query);

    if(this.isMounted()) {
      this.setState({
        images: ImageActions.loadImages(this.props.query)
      });
    }
  },


  componentDidUpdate: function() {
    // check if the grid fills the whole page
    if(this.state.images && this.state.images.length > 0 && !this.gridFillsPage) {
      this.initializeItems();
    }
  },


	_onChange: function() {
    this.setState({
      end: ImageStore.imagesEnd(),
      loading: ImageStore.loading(), 
      images: ImageStore.getImages()
    });
	},


	componentWillUnmount: function() {
		ImageStore.removeChangeListener(this._onChange);
    ImageStore.clearImages();
    window.removeEventListener("scroll", this.handleScroll);
	},


  openImage: function(i, e) {
    e.preventDefault();
    ModalActions.showModal(i);
  },


  initializeItems: function() {
    // Load just enough items to fill the whole page
    var grid = document.getElementById('js-grid');
    var gridHeight = grid.offsetHeight;
    var clientHeight = document.documentElement.clientHeight;
  
    if(!this.state.end && gridHeight < clientHeight ) {
      this.loadMore();
    } else {
      this.gridFillsPage = true
    }
  },


  loadMore: function() {
    if(!this.state.images) {
      return;
    }

    // get the search query parameters from store
    var imageQuery = this.props.query; 


    // only make ajax call if there are images available on the DB
    var lastItem = this.state.images[this.state.images.length -1];
    var query = {
      after : lastItem._id,
      limit: 20
    }
      

    // add any search queries to the request
    if(imageQuery && Object.keys(imageQuery).length)
      Object.assign(query, imageQuery);
       
    ImageActions.loadImages(query);
  },


  handleScroll: function(event) {
    if(this.state.end) {
      return;
    }

    var pageHeight = document.documentElement.scrollHeight;
    var clientHeight = document.documentElement.clientHeight;
    this.currentPosition = window.pageYOffset;

    if (this.previousPosition > this.currentPosition) {
      // scrolling up
    } else {
      // scrolling down
      if(pageHeight - (this.currentPosition + clientHeight) < clientHeight) {
        this.loadMore()
      }
    }
  },


  render: function() {

    var ifNoItems = !this.state.loading && this.state.images && this.state.images.length === 0;
    var ifItems = this.state.images && this.state.images.length > 0;     

    // check if there are any images to load
    if(ifNoItems) {
      return (
        <div className="container-fluid">
          <h3>No images to load</h3>
        </div>
      );

    } else if(ifItems) {
      return (
        <ImageGrid 
          images={this.state.images} 
          gridSize={this.props.gridSize} 
          openImage={this.openImage} 
          loading={this.state.loading} />
      );

    } else {
      return (
        <div className="grid">
          <Spinner />
        </div>
      );

    }
  }
});


module.exports = ImageGridContainer;

/*  Image gallery with lazy load
 *  
 *  TODO: place 'this.end' in state
 */



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
      loading: true
    }
  },


  previousPosition: window.pageYOffset, // determine if scrolling up or down
  gridFillsPage: false,
  end: false,


  queryDefaults: {
    limit: 20
  },


  // Check if images are loaded
  isLoaded: function() {
    return this.state.images ? true : false;
  },


	componentWillMount: function() {
		ImageStore.addChangeListener(this._onChange);
    window.addEventListener("scroll", _.debounce(this.handleScroll, 250 ) );
	},


  mergeQuery: function() {

    // assign query defaults
    var query = {};
    Object.assign(query, this.queryDefaults);

    // assign any queries passed by props
    if(typeof this.props.query !== 'undefined') {
      Object.assign(query, this.props.query);
    }

    // If not loading for the first time, setup query for next batch of images 
    if(!this.state.loading && this.state.images) {
      var lastItem = this.state.images[this.state.images.length -1];
      query.after = lastItem._id;
    }

    return query;

  },


  componentDidMount: function() {
    var query = this.mergeQuery();

    // We pass the current query to the store, so that it can be used by the gallery modal
    // Don't pass the mergeQuery() result, as this will also include the 'lastItem' parameter
    ImageActions.setImageQuery(this.props.query);


    if(this.isMounted()) {
      this.setState({
        images: ImageActions.loadImages(query)
      }); 
    }
  },


  shouldComponentUpdate: function() {
    // If images are undefined, do not re-render
    if(typeof this.state.images === undefined) {
      return false; 
    } else {
      return true;
    }
  },


  componentDidUpdate: function() {
    // Check if the grid fills the whole page.
    // Items are initializes only if data has been received
          // 
   // if(this.isLoaded() && this.state.images.length > 0 && !this.gridFillsPage) {
      //this.initializeLazyLoad();
    //}

    if(this.end) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  },


	_onChange: function() {
    this.end = ImageStore.imagesEnd();

    this.setState({
      loading: ImageStore.loading(), 
      images: ImageStore.getImages()
    });
	},


	componentWillUnmount: function() {
    console.log('imagegrid unmount');
		ImageStore.removeChangeListener(this._onChange);
    // clear old store data
    ImageStore.clearImages();
    window.removeEventListener("scroll", this.handleScroll);
	},


  openImage: function(i, e) {
    e.preventDefault();
    ModalActions.showModal(i);
  },

/*
  initializeLazyLoad: function() {
    // Load just enough items to fill the whole page
    var grid = document.getElementById('js-grid');
    var gridHeight = grid.offsetHeight;
    var clientHeight = document.documentElement.clientHeight;
  
    if(!this.end && gridHeight < clientHeight ) {
      this.loadItems();
    } else {
      this.gridFillsPage = true
    }
  },
*/

  loadItems: function(e) {
    if(e) {
      e.preventDefault();
    }

    if(this.end) {
      return;  
    }

    ImageActions.loadImages(this.mergeQuery())
  },


  handleScroll: function(event) {
    if(this.end) {
      return;
    }

    var pageHeight = document.documentElement.scrollHeight;
    var clientHeight = document.documentElement.clientHeight;
    this.currentPosition = window.pageYOffset;

    if (this.previousPosition < this.currentPosition) {
      // scrolling down
      if(!this.end && pageHeight - (this.currentPosition + clientHeight) < clientHeight) {
        this.loadItems()
      }
    } else { /* scrolling up */ }
  },


  render: function() {

    // there are no items to load
    var ifNoItems = this.end && this.state.images &&  this.state.images.length === 0;
    
    // there are items to load
    var ifItems = this.isLoaded() && !this.state.loading && this.state.images.length > 0;     

    // items are loading
    var ifLoading = !ifNoItems  && !ifItems;


    return (
      <div>
        {ifNoItems &&
          <div className="container-fluid">
            <h3>No images to load</h3>
          </div> 
        }

        {ifItems && 
          <ImageGrid 
            images={this.state.images} 
            gridSize={this.props.gridSize} 
            openImage={this.openImage} 
            loading={this.state.loading} />
        }

        { ifLoading && 
          <div className="grid">
            <Spinner />
          </div>
        }

           
        { !this.end &&
          <a href="#" onClick={this.loadItems}>Load More</a>
        }
      </div>
    );

  }
});


module.exports = ImageGridContainer;

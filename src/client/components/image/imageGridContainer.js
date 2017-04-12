/*  Image gallery with lazy load
 *  
 *  Parameters:
 *  'query': pass the query parameters to filter images (folder, title, user)
 *  'gridSize': optional parameter for the tile size (large)
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
      loading: true,
      end: false
    }
  },


  previousPosition: window.pageYOffset, // determine if scrolling up or down


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
        images: ImageActions.loadImages(this.mergeQuery())
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
    if(this.state.end) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  },


	_onChange: function() {
    this.state.end = ImageStore.imagesEnd();

    this.setState({
      loading: ImageStore.loading(), 
      images: ImageStore.getImages(),
      end: ImageStore.imagesEnd()
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


  loadItems: function(e) {
    if(e) {
      e.preventDefault();
    }

    if(this.state.end) {
      return;  
    }

    ImageActions.loadImages(this.mergeQuery())
  },


  handleScroll: function(event) {
    console.info('handleScroll -  loading: ', this.state.loading);
    console.info('handleScroll -  end: ', this.state.end);
    // if images are finished, or if we are already loading, stop immediately
    if(this.state.end || this.state.loading) {
      return;
    }

    var pageHeight = document.documentElement.scrollHeight;
    var clientHeight = document.documentElement.clientHeight;
    this.currentPosition = window.pageYOffset;

    if (this.previousPosition < this.currentPosition) {
      // scrolling down
      if(!this.state.end && pageHeight - (this.currentPosition + clientHeight) < clientHeight) {
        this.loadItems();
      }
    } else { /* scrolling up */ }
  },


  render: function() {

    // there are no items to load
    var ifNoItems = this.state.end && this.state.images &&  this.state.images.length === 0;
    
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

           
        { !this.state.end &&
          <a href="#" onClick={this.loadItems}>Load More</a>
        }
      </div>
    );

  }
});


module.exports = ImageGridContainer;

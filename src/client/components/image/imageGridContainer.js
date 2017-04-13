/*  Image gallery with lazy load
 *  
 *  Optional parameters via props:
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
  query: {},

  queryDefaults: {
    limit: 20
  },


  // Check if images are loaded
  isLoaded: function() {
    return this.state.images ? true : false;
  },


	componentWillMount: function() {
		ImageStore.addChangeListener(this._onChange);
	},


  componentDidMount: function() {

    this.query = this.mergeQuery();

    // We pass the current query to the store, so that it can be used by the gallery modal
    // Don't pass the mergeQuery() result, as this will also include the 'lastItem' parameter
    ImageActions.setImageQuery(this.props.query);


    if(this.isMounted()) {
      window.addEventListener("scroll", this.handleScroll);

      this.setState({
        images: ImageActions.loadImages(this.query)
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


	_onChange: function() {
    this.setState({
      loading: ImageStore.loading(), 
      images: ImageStore.getImages(),
      end: ImageStore.imagesEnd()
    });
	},


	componentWillUnmount: function() {
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

    this.query = this.mergeQuery();

    ImageActions.loadImages(this.query)
  },


  handleScroll: _.debounce(function(e) {

    var pageHeight = document.documentElement.scrollHeight;
    var clientHeight = document.documentElement.clientHeight;
    this.currentPosition = window.pageYOffset;
    var triggerPoint = pageHeight - (this.currentPosition + clientHeight);

    if (this.previousPosition < this.currentPosition) {
      // do not trigger scroll until: component has finished loading, there are images to load, before the end of page
      if(!this.state.loading && !this.state.end && triggerPoint < clientHeight) {
        this.loadItems();
      }
    } else {
      //  scrolling up  
    } 
	
  }, 500),


  mergeQuery: function() {
    /* The function creates a 'query' object that is then
     * passed to the backend to query for the correct set of images.
     * Data passed: 
     * {
     *   length: 'max images that will be loaded',
     *   after: 'the last image in the images array',
     *   folder: 'ID of the folder that contains the image'
     * }
     */

    // assign query defaults
    var query = {};
    Object.assign(query, this.queryDefaults);

    // assign any queries passed by props
    Object.assign(query, this.props.query);

    // If not loading for the first time, setup lazt-load of next set of images 
    if(!this.state.loading && this.state.images) {
      var lastItem = this.state.images[this.state.images.length -1];
      query.after = lastItem._id;
    }

    return query;
  },


  render: function() {

    // there are no items to load
    var ifNoItems = this.state.end && this.state.images &&  this.state.images.length === 0;
    
    // there are items to load
    var ifItems = this.isLoaded() && !this.state.loading && this.state.images.length > 0;     

    // items are loading
    var ifLoading = !ifNoItems  && !ifItems;

    // show 'load more' if there are more than N of images
    var showMore = !this.state.end && this.state.images && this.state.images.length >= this.queryDefaults.limit;

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
            loading={this.state.loading}
            modifiers={this.props.modifiers}
          />
        }

        { ifLoading && 
          <div className="grid">
            <Spinner />
          </div>
        }

           
        <div className="grid__more">
        { showMore &&
          <a href="#" ref="loadMore" onClick={this.loadItems}>Load More</a>
        }
        </div>
      </div>
    );

  }
});


module.exports = ImageGridContainer;

/*  Image gallery with lazy load
 *
 *  Optional parameters passed via props:
 *  'query': pass the query parameters to filter images (folder, title, user)
 *  'gridSize': optional parameter for the tile size (large)
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import ModalActions from '../../actions/modalActions';
import ImageActions from '../../actions/imageActions';
import ImageStore from '../../stores/imageStore';
import ImageGrid from './imageGrid';
import Spinner from '../common/spinner';


class ImageGridContainer extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      end: false
    };


    this.handleScroll = _.debounce(this.handleScroll.bind(this), 500);
    this.loadItems = this.loadItems.bind(this);
    this.onChange = this.onChange.bind(this);
    this.openImage = this.openImage.bind(this);
    this.queryDefaults = {
      limit: 20
    };
    this.previousPosition = window.pageYOffset; // determine if scrolling up or down
    this.query = {};
    this.size = this.props.size ? this.props.size : '';
  }


  // Check if there are images
  isLoaded() {
    return this.state.images ? true : false;
  }


  componentWillMount() {
    ImageStore.addChangeListener(this.onChange);
  }


  componentDidMount() {

    this.query = this.mergeQuery();

    window.addEventListener("scroll", this.handleScroll);

    this.setState({
      images: ImageActions.loadImages(this.query)
    });
  }


  shouldComponentUpdate() {
    // If images are undefined, do not re-render
    if(typeof this.state.images === undefined) {
      return false;
    } else {
      return true;
    }
  }


  onChange() {
    this.setState({
      loading: ImageStore.loading(),
      images: ImageStore.getImages(),
      end: ImageStore.imagesEnd()
    });
  }


  componentWillUnmount() {
    ImageStore.removeChangeListener(this.onChange);
    // clear old store data
    ImageStore.clearCache();
    window.removeEventListener("scroll", this.handleScroll);
  }


  openImage(i) {
    // We pass the current query to the store, so that it can be used by the gallery modal
    // to retrive the correct images on lazy-load.
    // Don't pass the mergeQuery() result, as this will also include the 'lastItem' parameter
    ImageActions.setImageQuery(this.props.query);
    ModalActions.showModal(i);
  }


  loadItems(e) {
    if(e) {
      e.preventDefault();
    }

    this.query = this.mergeQuery();

    ImageActions.loadImages(this.query)
  }



  handleScroll(e) {

    let pageHeight = document.documentElement.scrollHeight;
    let clientHeight = document.documentElement.clientHeight;
    this.currentPosition = window.pageYOffset;
    let triggerPoint = pageHeight - (this.currentPosition + clientHeight);

    if (this.previousPosition < this.currentPosition) {
      // do not trigger scroll until: component has finished loading, there are images to load, before the end of page
      if(!this.state.loading && !this.state.end && triggerPoint < clientHeight) {
        this.loadItems();
      }
    } else {
      //  scrolling up
    }
	
  }


  mergeQuery() {
    /* The function creates the 'query' object that is to
     * the backend to retrive the correct set of images.
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
  }


  render() {
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
            size={this.size}
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
};


ImageGridContainer.propTypes = {
  query: PropTypes.object,
  size: PropTypes.string
}


export default ImageGridContainer;
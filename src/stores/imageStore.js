var _ = require('lodash');
import AppDispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

var _images = [];
var _imagesEnd = false;
var _loading = true;
var _imagesQuery = "";
  

class ImageStoreClass extends EventEmitter {

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getImageById(id) {
    return _.find(_images, {_id: id});
  }

  getImages() {
    return _images;
  }

  clearCache() {
    _images = [];
    _imagesEnd = false;
    _loading = true;
    _imagesQuery = "";
  }

  imagesEnd() {
    return _imagesEnd;
  }

  loading() {
    return _loading;
  }

  getImageQuery() {
    return _imagesQuery
  }

};


const ImageStore = new ImageStoreClass();


ImageStore.dispatchToken = AppDispatcher.register(action => {
	switch(action.actionType) {

		case ActionTypes.GET_IMAGES:
      if(typeof action.gallery !== undefined && action.gallery.length > 0) {

        var isEqual = _.isEqual(_images, action.gallery);
        
        // add unique images to store
        _imagesEnd = false;
        _images = _.concat(_images, action.gallery);
        _images = _.uniqBy(_images, '_id');
              

        // no new images received from server, before lazy load
        if(isEqual) {
          _imagesEnd = true;
        }


      } else {
        // no new images received from server, after lazy load
        console.log('Image store, end of images');
        _imagesEnd = true;
      }

      // component has loaded first set of images
      _loading = false;

			ImageStore.emitChange();
			break;


    case ActionTypes.CREATE_IMAGE:
			_images.push(action.image);
			ImageStore.emitChange();
			break;


    case ActionTypes.DELETE_IMAGE:
			_.remove(_images, function(image){
        return image._id === action.id;
			});
      
			ImageStore.emitChange();
			break;
  

    case ActionTypes.SET_IMAGES_QUERY:
      _imagesQuery = action.filters;
			ImageStore.emitChange();
      break;


		default:
			// no operations
	}
});


export default ImageStore;

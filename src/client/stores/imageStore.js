"use strict";

var _ = require('lodash');
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _images = [];
var _imagesEnd = false;
var _loading = true;
var _imagesQuery = "";

var ImageStore = assign({}, EventEmitter.prototype, {

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	getImageById: function(id) {
		return _.find(_images, {_id: id});
	},

	getImages: function() {
		return _images;
	},

  clearImages: function() {
    _images = [];
  },

  imagesEnd: function() {
    return _imagesEnd; 
  },

  loading: function() {
    return _loading;
  },

  getImageQuery: function() {
    return _imagesQuery 
  },

});


Dispatcher.register(function(action){
	switch(action.actionType) {

		case ActionTypes.GET_IMAGES:
      if(typeof action.gallery !== undefined && action.gallery.length > 0) {
        // add unique images to store
        _imagesEnd = false;
        _images = _.concat(_images, action.gallery);
        _images = _.uniqBy(_images, '_id');
      } else {
        // no more images to load
        console.log('Image store, end of images');
        _imagesEnd = true;
      }

      _loading = false;

//      console.info('image store: ', _images);
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


module.exports = ImageStore;

"use strict";

var _ = require('lodash');
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _images = [];
var _userImages = [];
var _authorImages = [];
var _filters = {};

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

	getAllImages: function() {
		return _images;
	},

  getUserImages: function() {
    return _userImages;
  },

  getAuthorImages: function() {
    return _authorImages;
  },

  clearUserImages: function() {
    _userImages = [];
  },

  getFilters: function() {
    return _filters; 
  }

});


Dispatcher.register(function(action){
	switch(action.actionType) {
		case ActionTypes.INITIALIZE:
			_images = action.initialData.images;
			ImageStore.emitChange();
			break;

    case ActionTypes.GET_USER_IMAGES: 
			_userImages = action.gallery;
			ImageStore.emitChange();
			break;

    case ActionTypes.GET_AUTHOR_IMAGES: 
			_authorImages = action.gallery;
      console.info('image author store: ', _authorImages);
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
      
			_.remove(_userImages, function(image){
        return image._id === action.id;
			});

			ImageStore.emitChange();
			break;

    case ActionTypes.SET_IMAGE_FILTERS:
      _filters = action.filters;
			ImageStore.emitChange();
      break;

		default:
			// no operations
	}
});


module.exports = ImageStore;

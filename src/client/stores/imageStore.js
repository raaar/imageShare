"use strict";

var _ = require('lodash');
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _images = [];
var _imageQuery = {};

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


  clearImages: function() {
    _images = []; 
  },

  getImageQuery: function() {
    return _imageQuery; 
  }

});


Dispatcher.register(function(action){
	switch(action.actionType) {
		case ActionTypes.INITIALIZE:
			_images = action.initialData.images;
			ImageStore.emitChange();
			break;


		case ActionTypes.GET_IMAGES:
      _images = _images.concat(action.gallery);
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


    case ActionTypes.SET_IMAGE_FILTERS:
      _imageQuery = action.filters;
			ImageStore.emitChange();
      break;

		default:
			// no operations
	}
});


module.exports = ImageStore;

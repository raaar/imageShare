"use strict";

var _ = require('lodash');
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _images = [];

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

});

Dispatcher.register(function(action){
	switch(action.actionType) {
		case ActionTypes.INITIALIZE:
			_images = action.initialData.images;
			ImageStore.emitChange();
			break;

    case ActionTypes.CREATE_IMAGE: 
			_images.push(action.image);
			ImageStore.emitChange();
			break;

    case ActionTypes.DELETE_IMAGE: 
			console.log('delete image, do something in the image store');
      //console.log(action);
                  
      console.info('before: ', _images.length);            
			_.remove(_images, function(image){
		//		console.log(image._id);
		//		console.info("action:" , action.id);
        return image._id === action.id;
			});
      
      console.info('after: ', _images.length);            
			ImageStore.emitChange();
			break;
		default:
			// no operations
	}
});


module.exports = ImageStore;

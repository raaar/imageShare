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
		console.info('image store get all images: ', _images);
		return _images;
	},

});

Dispatcher.register(function(action){
	switch(action.actionType) {
		case ActionTypes.INITIALIZE:
			_images = action.initialData.images;
      console.info('imageStore INITIALIZE: ', _images);
			ImageStore.emitChange();
			break;

    case ActionTypes.CREATE_IMAGE: 
      console.info('imageStore: ' + action);
			_images.push(action.image);
			ImageStore.emitChange();
			break;

		default:
			// no operations
	}
});


module.exports = ImageStore;

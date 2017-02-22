"use strict";

var _ = require('lodash');
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _profile = [];

var ProfileStore = assign({}, EventEmitter.prototype, {

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

  getProfile: function(author) {
    console.log(author);
    return author;
  }

});


Dispatcher.register(function(action){
	switch(action.actionType) {
		case ActionTypes.INITIALIZE_PROFILE:
			_profile = action.initialData.profile;
      console.info('profileStore INITIALIZE: ', _profile);
			ProfileStore.emitChange();
			break;

		default:
			// no operations
	}
});

module.exports = ProfileStore;

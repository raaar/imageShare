"use strict";

var _ = require('lodash');
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _user = [];

var UserStore = assign({}, EventEmitter.prototype, {

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

  getUser: function() {
    return _user;
  }

});


Dispatcher.register(function(action){
	switch(action.actionType) {
		case ActionTypes.INITIALIZE_USER:
			_user = action.userData;
      console.info('userStore INITIALIZE: ', _user);
			UserStore.emitChange();
			break;

		default:
			// no operations
	}
});

module.exports = UserStore;

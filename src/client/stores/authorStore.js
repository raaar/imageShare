"use strict";

var _ = require('lodash');
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _authors = [];


var AuthorStore = assign({}, EventEmitter.prototype, {

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	getAll: function() {
		return _authors;
	}

});


Dispatcher.register(function(action){
	switch(action.actionType) {
		case ActionTypes.GET_ALL_AUTHORS:
			_authors = action.authors;
			AuthorStore.emitChange();
			break;

		default:
			// no operations
	}
});


module.exports = AuthorStore;

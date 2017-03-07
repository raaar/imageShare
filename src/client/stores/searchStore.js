
var _ = require('lodash');
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _query = "";
var _searchResults = [];


var SearchStore = assign({}, EventEmitter.prototype, {

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

  getQuery: function() {
    return _query;
  },

  getResults: function() {
    return _searchResults; 
  }
});


Dispatcher.register(function(action){
	switch(action.actionType) {

    case ActionTypes.SEARCH_QUERY: 
			_query = action.query;
			_searchResults = action.results;
			SearchStore.emitChange();
			break;

		default:
			// no operations
	}
});


module.exports = SearchStore;

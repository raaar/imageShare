
var _ = require('lodash');
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _query = [];
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

var _oldQuery; 

Dispatcher.register(function(action){
	switch(action.actionType) {

    case ActionTypes.SEARCH_IMAGES: 
			_query = action.query;
      if(_query === _oldQuery) {
        console.log('searchStore: query has not changed, break');
        break;
      }
      sessionStorage.SearchQuery = JSON.stringify(action.query);
      console.info('SEARCH_IMAGES: ', _query );
      console.info('SEARCH_IMAGES: ', _searchResults );
			SearchStore.emitChange();
			break;

    case ActionTypes.SEARCH_RESULTS: 
      if(_query === _oldQuery) {
        console.log('searchStore: query has not changed, break');
        console.info('old query: ', _query);
        console.info('new query: ', action.query);
        break;
      }
			_searchResults = action.results;
      console.info('SEARCH_RESULTS: ', _query );
      console.info('SEARCH_RESULTS: ', _searchResults );
			SearchStore.emitChange();
			break;

		default:
			// no operations
	}
});


module.exports = SearchStore;

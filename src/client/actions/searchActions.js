"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var Api = require('../api/imagesApi');
var ActionTypes = require('../constants/actionTypes');

var SearchActions = {
  query: function(query) {
    console.info('search action query: ', query);
    Dispatcher.dispatch({
	    actionType: ActionTypes.SEARCH_IMAGES,
		  query: query 
	  });
  },

  search: function(query) {
    console.info('get images: ', query);
    if(query.length >= 2) {
      console.log(query);

      Api.get('api/images?title=' + query ) 
        .then(function(data) {
          console.info('search data: ', data);
                
          Dispatcher.dispatch({
			      actionType: ActionTypes.SEARCH_RESULTS,
		      	results: data,
            query: query
	      	});
          
        });
        
    }
  }
}


module.exports = SearchActions;


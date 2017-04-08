"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var Api = require('../api/imagesApi');
var ActionTypes = require('../constants/actionTypes');

var SearchActions = {
  query: function(query) {
          
    Dispatcher.dispatch({
	    actionType: ActionTypes.SEARCH_QUERY,
		  query: query 
	  });
    
    if(query.length >= 1) {
      Api.get('api/images/fetch?title=' + query ) 
        .then(function(data) {
          console.info('q: ', query);
          console.log(data);
          /*      
          Dispatcher.dispatch({
			      actionType: ActionTypes.SEARCH_QUERY,
		      	results: data,
		        query: query 
	      	});
          */
        });
    }
  }
}


module.exports = SearchActions;


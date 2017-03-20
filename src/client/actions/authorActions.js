"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var Api = require('../api/imagesApi');
var ActionTypes = require('../constants/actionTypes');


var AuthorActions = {
  
  getAll: function() {
    Api.get('api/profile/all') 
      .then(function(data) {
        Dispatcher.dispatch({
			    actionType: ActionTypes.GET_ALL_AUTHORS,
		  	  authors: data 
	      });
      });
  }

};


module.exports = AuthorActions;

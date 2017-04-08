"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var axios = require('axios');
var ActionTypes = require('../constants/actionTypes');


var AuthorActions = {
  
  getAll: function() {
    axios.get('api/profile/all') 
    .then(function(data) {
      Dispatcher.dispatch({
		   actionType: ActionTypes.GET_ALL_AUTHORS,
			  authors: data.data 
	    });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

};


module.exports = AuthorActions;

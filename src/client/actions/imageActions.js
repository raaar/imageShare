"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var Api = require('../api/imagesApi');
var ActionTypes = require('../constants/actionTypes');

var ImageActions = {
	createImage: function(image) {

  
    Api.post('api/images/create', image)
         
      .then(function(data){
        console.log('dispatcherData: ', data);
	  /* 
        Dispatcher.dispatch({
			    actionType: ActionTypes.CREATE_IMAGE,
		    	image: data 
	    	});
      */  
      });
      
      
	}
}

module.exports = ImageActions;

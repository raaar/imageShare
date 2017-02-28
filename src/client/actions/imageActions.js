"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var Api = require('../api/imagesApi');
var ActionTypes = require('../constants/actionTypes');

var ImageActions = {

  saveAvatar: function(image) {
//    console.log(image);
          
    Api.postImage('api/user/avatar', image)
      // render the data that was posted to the server
      .then(function(data){
       /*       
        Dispatcher.dispatch({
			    actionType: ActionTypes.CREATE_IMAGE,
		    	image: data 
	    	});
        */
      });
    
  },

	createImage: function(image) {

    Api.postImage('api/images', image)
      // render the data that was posted to the server
      .then(function(data){
        Dispatcher.dispatch({
			    actionType: ActionTypes.CREATE_IMAGE,
		    	image: data 
	    	});
      });
	},

  deleteImage: function(id) {
   var url = "api/images/" + id;
   Api.delete(url, id)
     .then(function(data){
       console.info('success: ', data ); 
       Dispatcher.dispatch({
         actionType: ActionTypes.DELETE_IMAGE,
         id: id
		   });
     });
    /*      
		AuthorApi.deleteAuthor(id);
		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_AUTHOR,
			id: id
		});
    */
    console.info('Deleting: ', id );
  }
}

module.exports = ImageActions;

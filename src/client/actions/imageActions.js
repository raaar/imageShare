"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var Api = require('../api/imagesApi');
var s3Signature = require('../api/s3Sign');
var ActionTypes = require('../constants/actionTypes');
var toastr = require('toastr');
var ImageStore = require('../stores/imageStore');

var ImageActions = {


  // TODO: this could be merged with userImages and authorImages and potentially with the initialize images function
  loadMoreImages: function(q) {
    var queryFilters = ImageStore.getFilters();


    var query = "";
   
    if(q) {
    
      if(Object.keys(q).length > 0) {
        query += "?"
      }
 
      for(var key in q) {
        query += key + "=" + q[key] + "&" ;
      };
    }

          /*
    if(Object.keys(queryFilters).length > 0 ) {
      for(var k in queryFilters) {
              console.log(queryFilters[k]);
        query += k + "=" + queryFilters[k] + "&" ;
      };
    }
    */

    //console.info('query filters: ', queryFilters);

    console.info('load more images query: ', query);

    Api.get('api/images/fetch' + query ) 
      .then(function(data) {
        console.info('load more images data', data );
        Dispatcher.dispatch({
			    actionType: ActionTypes.GET_IMAGES,
		  	  gallery: data 
	      });
      });
  },


  userImages: function(user) {
    Api.get('api/images?author=' + user ) 
      .then(function(data) {
        Dispatcher.dispatch({
			    actionType: ActionTypes.GET_USER_IMAGES,
		  	  gallery: data 
	      });
      });
  },


  authorImages: function(q) {
    console.info('author query: ', q);

    var query = "";
   
    if(q) {
    
      if(Object.keys(q).length > 0) {
        query += "?"
      }
 
      for(var key in q) {
        query += key + "=" + q[key] + "&" ;
      };
    }


    Api.get('api/images/fetch' + query ) 
      .then(function(data) {
        console.info('author query data: ', data);
        Dispatcher.dispatch({
			    actionType: ActionTypes.GET_AUTHOR_IMAGES,
		  	  gallery: data 
	     });
      });
  },


	createImage: function(form, file, error, success) {
    s3Signature(file, function(file, signedRequest, url){
      toastr.warning('Uploading image');
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){

            var uploadData = {
              formData: form,
              id: file.id,
              lastModified: file.lastModified,
              lastModifiedDate: file.lastModifiedDate,
              type: file.type,
              size: file.size
            };

            Api.post('api/images', uploadData)
              .then(function(data){
                if(data.error && data.error.length) {
                  return error(data.error);
                } else {
                  success();  
                  Dispatcher.dispatch({
			              actionType: ActionTypes.CREATE_IMAGE,
		                image: data 
	                });
                }
              });
          }
          else{
            alert('Could not upload file.');
          }
        }
      };
      xhr.send(file);
    });
  },


  /*
	createImage: function(image, error, success) {
    Api.postImage('api/images', image)
      .then(function(data){
        if(data.error && data.error.length) {
          return error(data.error);
        } else {
          success();  
          Dispatcher.dispatch({
			      actionType: ActionTypes.CREATE_IMAGE,
		        image: data 
	        });
        }
      });
	},
  */


  deleteImage: function(id) {
   var url = "api/images/" + id;
   Api.delete(url, id)
     .then(function(data){
       Dispatcher.dispatch({
         actionType: ActionTypes.DELETE_IMAGE,
         id: id
		   });
     });
  },



  setImageFilters: function(filters) {
    console.log(filters);
    Dispatcher.dispatch({
      actionType: ActionTypes.SET_IMAGE_FILTERS,
      filters: filters
    });
  }
}


module.exports = ImageActions;

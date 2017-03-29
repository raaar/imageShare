"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var Api = require('../api/imagesApi');
var s3Signature = require('../api/s3Sign');
var ActionTypes = require('../constants/actionTypes');
var toastr = require('toastr');

var ImageActions = {


  loadImages: function(q) {

    var query = "";
   
    if(q) {
    
      if(Object.keys(q).length > 0) {
        query += "?"
      }
 
      for(var key in q) {
        query += key + "=" + q[key] + "&" ;
      };
    }

//          debugger;

    console.log('load images ' + query);

    Api.get('api/images/fetch' + query ) 
      .then(function(data) {
        Dispatcher.dispatch({
			    actionType: ActionTypes.GET_IMAGES,
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


  setImageQuery: function(filters) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SET_IMAGES_QUERY,
      filters: filters
    });
  }
}


module.exports = ImageActions;

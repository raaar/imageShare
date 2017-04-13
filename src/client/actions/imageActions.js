"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var Api = require('../api/imagesApi');
var s3Signature = require('../api/s3Sign');
var ActionTypes = require('../constants/actionTypes');
var toastr = require('toastr');
var axios = require('axios');


var ImageActions = {


  loadImages: function(q) {

    console.info('load image query: ', q);

    axios.get('/api/images/fetch', {
      params: q
    })
    .then(function (data) {
            
      Dispatcher.dispatch({
		   actionType: ActionTypes.GET_IMAGES,
		    gallery: data.data 
	    });
      
      console.info('loadImages q: ', q);
      console.info('loadImages: ', data);
    })
    .catch(function (error) {
      console.log(error);
    });
  },


	createImage: function(form, file, folderId) {
    s3Signature(file, function(file, signedRequest, url){
      toastr.warning('Uploading image');
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){

            var uploadData = {
              folderId: folderId,
              formData: form,
              id: file.id,
              lastModified: file.lastModified,
              lastModifiedDate: file.lastModifiedDate,
              type: file.type,
              size: file.size
            };

            var config = {};

            axios.post('api/images', uploadData, config)
              .then(function (data) {
                Dispatcher.dispatch({
			            actionType: ActionTypes.CREATE_IMAGE,
		              image: data.data 
	              });
              })
              .catch(function (error) {
                console.log(error);
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
          
    axios.delete(url)
      .then(function (response) {
        console.log(response);
        Dispatcher.dispatch({
          actionType: ActionTypes.DELETE_IMAGE,
          id: id
		    });
      })
      .catch(function (error) {
        console.log(error);
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

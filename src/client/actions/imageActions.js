"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var Api = require('../api/imagesApi');
var ActionTypes = require('../constants/actionTypes');
var toastr = require('toastr');

var ImageActions = {

//  get: function(query) {
//    console.info('get images: ', query);
//  },

  userImages: function(user) {
    Api.get('api/images?author=' + user ) 
      .then(function(data) {
        Dispatcher.dispatch({
			    actionType: ActionTypes.GET_USER_IMAGES,
		    	gallery: data 
	    	});
      });
  },

	createImage: function(image,file, error, success) {
    console.log(image);
    getSignedRequest(file);
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
  }
}

function getSignedRequest(file){

  console.info('file name: ', file.name);
  console.info('file type: ', file.type);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        console.log(xhr);
        var response = JSON.parse(xhr.responseText);
        uploadFile(file, response.signedRequest, response.url);
      }
      else{
        alert('Could not get signed URL.');
      }
    }
  };
  xhr.send();
};

function uploadFile(file, signedRequest, url) {
  console.info('uploadFile file: ', file);
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
//        document.getElementById('preview').src = url;
 //       document.getElementById('avatar-url').value = url;
      }
      else{
        alert('Could not upload file.');
      }
    }
  };
  xhr.send(file);
}

module.exports = ImageActions;

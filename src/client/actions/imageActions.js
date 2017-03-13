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


  getSignedRequest: function(file, cb){

    var fileExt;
    if(file.type === 'image/jpeg') {
      fileExt = '.jpeg';
    } else if (file.type === 'image/png' ) {
      fileExt = '.png'; 
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', `/sign-s3?file-name=${file.id}${fileExt}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var response = JSON.parse(xhr.responseText);
          cb(file, response.signedRequest, response.url);
        }
        else{
          alert('Could not get signed URL.');
        }
      }
    };
    xhr.send();
  },

	createImage: function(form, file, error, success) {
    this.getSignedRequest(file, function(file, signedRequest, url){
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
                  console.info('data: ', data);
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
  }
}

/*
function getSignedRequest(file, cb){

  console.info('file name: ', file.name);
  console.info('file type: ', file.type);
  console.info('file id: ', file.id);
  
  var fileExt;
  if(file.type === 'image/jpeg') {
    fileExt = '.jpeg';
  } else if (file.type === 'image/png' ) {
    fileExt = '.png'; 
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', `/sign-s3?file-name=${file.id}${fileExt}&file-type=${file.type}`);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        console.log(xhr);
        var response = JSON.parse(xhr.responseText);
//        uploadFile(file, response.signedRequest, response.url);
        cb(file, response.signedRequest, response.url);
      }
      else{
        alert('Could not get signed URL.');
      }
    }
  };
  xhr.send();
};
*/

/*
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
*/
module.exports = ImageActions;

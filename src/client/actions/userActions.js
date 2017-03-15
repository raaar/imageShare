"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var Api = require('../api/imagesApi');
var ActionTypes = require('../constants/actionTypes');
var toastr = require('toastr');
var s3Signature = require('../api/s3Sign');

var UserActions = {

  saveAvatar: function(data, file, cb) {
    s3Signature(file, function(file, signedRequest, url){



      var xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){

            var avatarData = {
              id: data.fileName
            };

            data.user.avatar = data.fileName;
            var userData = data.user; 

            Api.post('api/user/avatar', avatarData)
              .then(function(data){
                if(data.error &&  data.error.length)
                  return cb(data.error);

                Dispatcher.dispatch({
			            actionType: ActionTypes.INITIALIZE_USER,
                  userData: userData
	    	        });
              });

          } else{
            alert('Could not upload file.');
          }
        }
      };
      xhr.send(file);
    });
  },

  saveAvatarOriginal: function(data, file, cb) {
    s3Signature(file, function(file, signedRequest, url){
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){

            var avatarData = {
              id: data.fileName
            };

            data.user.avatar = data.fileName;
            var userData = data.user; 

            Api.post('api/user/avatar', avatarData)
              .then(function(data){
                if(data.error &&  data.error.length)
                  return cb(data.error);

                Dispatcher.dispatch({
			            actionType: ActionTypes.INITIALIZE_USER,
                  userData: userData
	    	        });
              });

          } else{
            alert('Could not upload file.');
          }
        }
      };
      xhr.send(file);
    });
  },


  logOut: function(cb) {
    Api.post('auth/logout', {} )
      .catch(function(rejected){
        sessionStorage.clear();
        cb();
      });
  }
}

module.exports = UserActions;

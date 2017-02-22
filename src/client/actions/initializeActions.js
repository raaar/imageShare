"use strict";
// TODO: see if this is needed

var Dispatcher = require('../dispatcher/appDispatcher');
var ImagesApi = require('../api/imagesApi');
var ActionTypes = require('../constants/actionTypes');
var ImageStore = require('../stores/imageStore');
var $ = require('jquery');
// var axios = require('axios');

// http://www.thedreaming.org/2015/03/14/react-ajax/
var InitializeActions = {
	initApp: function() {

    ImagesApi.getAllImages('api/images')
      .then(function(data){
        Dispatcher.dispatch({
          actionType: ActionTypes.INITIALIZE,
            initialData: {
              images: data
            }
          });
        });
  /*
    // Axios can be used as an alternative for Ajax requests. Use Axios if jQuery is not used in the app
    axios.get('api/images')
      .then(function (response) {
        Dispatcher.dispatch({
          actionType: ActionTypes.INITIALIZE,
          initialData: {
            images: response.data 
          }
        });
     })
    .catch(function (error) {
      console.log(error);
    });
  */
	}
};

module.exports = InitializeActions;

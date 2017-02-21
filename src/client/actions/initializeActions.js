"use strict";
// TODO: see if this is needed

var Dispatcher = require('../dispatcher/appDispatcher');
var ImagesApi = require('../api/imagesApi');
var ActionTypes = require('../constants/actionTypes');
var ImageStore = require('../stores/imageStore');
var $ = require('jquery');
var axios = require('axios');

// http://www.thedreaming.org/2015/03/14/react-ajax/
var InitializeActions = {
	initApp: function() {

    /*
    axios.get('api/images')
      .then(function (response) {
        Dispatcher.dispatch({
          actionType: ActionTypes.INITIALIZE,
          initialData: {
            images: response 
          }
        });
     })
    .catch(function (error) {
      console.log(error);
    });
    */
          
   $.ajax({  
      url:'api/images',
      dataType:"json",
      success: function(data) {
        console.log('images ajax success');
        Dispatcher.dispatch({
          actionType: ActionTypes.INITIALIZE,
          initialData: {
            images: data
          }
        });
      },
      error: function() {
      
      }
    });
   

    // TODO: incorrect
    $.ajax({  
      url:'api/profile/',
      dataType:"json",
      success: function(data) {
        console.info('initialize profile: ', data );

        Dispatcher.dispatch({
          actionType: ActionTypes.INITIALIZE_PROFILE,
          initialData: {
            profile: data
          }
        });
      },
      error: function() {
        console.log('ajax profile fail') 
      }
    })

	}
};

module.exports = InitializeActions;

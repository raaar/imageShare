"use strict";
// TODO: see if this is needed

var Dispatcher = require('../dispatcher/appDispatcher');
var Api = require('../api/imagesApi');
var ActionTypes = require('../constants/actionTypes');
var ImageStore = require('../stores/imageStore');
var $ = require('jquery');
var _ = require('lodash');


var InitializeActions = {
	initApp: function() {

    var _userData;

    var userDataDispatch = function(data) {
      Dispatcher.dispatch({
        actionType: ActionTypes.INITIALIZE_USER,
          userData: data
       }); 
    };


    if (sessionStorage.UserStore && sessionStorage.UserStore !== "undefined") {
      _userData = JSON.parse(sessionStorage.UserStore);
      userDataDispatch(_userData);
    } else {
      _userData =  null;
      Api.get('api/user')
        .then(function(data){
          userDataDispatch(data);
        });
    }

	}
};

module.exports = InitializeActions;

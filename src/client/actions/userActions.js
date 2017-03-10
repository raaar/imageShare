"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var Api = require('../api/imagesApi');
var ActionTypes = require('../constants/actionTypes');
var toastr = require('toastr');

var UserActions = {
  saveAvatar: function(data, cb) {
    
    Api.patch('api/user/avatar', data)
      .then(function(data){
        if(data.error.length)
          return cb(data.error);

          Dispatcher.dispatch({
			      actionType: ActionTypes.INITIALIZE_USER,
            userData: data
	    	  });
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

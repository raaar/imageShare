"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var Api = require('../api/imagesApi');
var ActionTypes = require('../constants/actionTypes');


var UserActions = {
  saveAvatar: function(data) {
    Api.patch('api/user/avatar', data)
      .then(function(data){
        var avatarFileName = data;

        Dispatcher.dispatch({
			    actionType: ActionTypes.UPDATE_USER,
		    	avatar: avatarFileName
	    	});
      });
  },

  logOut: function(cb) {
    Api.post('auth/logout', {} )
      .catch(function(rejected){
        cb();
      });
  }
}

module.exports = UserActions;

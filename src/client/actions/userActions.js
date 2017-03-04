"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var Api = require('../api/imagesApi');
var ActionTypes = require('../constants/actionTypes');


var UserActions = {
  saveAvatar: function(data) {
    
    Api.patch('api/user/avatar', data)
      .then(function(data){
        var avatarData = data;
        console.info('patch avatar data: ', avatarData);

        Dispatcher.dispatch({
			    actionType: ActionTypes.INITIALIZE_USER,
          userData: avatarData
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

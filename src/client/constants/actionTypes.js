"use strict";

var keyMirror = require('react/lib/keyMirror');

// KeyMirror copys the value on the left, and places it on the right, so that we don't have to type the INITIALIZE property twice 
module.exports = keyMirror({
	INITIALIZE: null,
  INITIALIZE_PROFILE: null,
  INITIALIZE_USER: null,
  CREATE_IMAGE: null,
  DELETE_IMAGE: null,
  UPDATE_AVATAR: null,

  CREATE_AUTHOR: null,
	UPDATE_AUTHOR: null,
	DELETE_AUTHOR: null
});

"use strict";

var keyMirror = require('react/lib/keyMirror');

// KeyMirror copys the value on the left, and places it on the right, so that we don't have to type the INITIALIZE property twice 
module.exports = keyMirror({
	INITIALIZE: null,
  INITIALIZE_PROFILE: null,
  CREATE_IMAGE: null,
  CREATE_AUTHOR: null,
	UPDATE_AUTHOR: null,
	DELETE_AUTHOR: null
});

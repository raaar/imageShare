"use strict";

var keyMirror = require('react/lib/keyMirror');

// KeyMirror copys the value on the left, and places it on the right, so that we don't have to type the INITIALIZE property twice 
module.exports = keyMirror({
  INITIALIZE_USER: null,
  USER_ERROR: null,
  CREATE_IMAGE: null,
  DELETE_IMAGE: null,
  UPDATE_AVATAR: null,
  SHOW_MODAL: null,
  HIDE_MODAL: null,
  TOGGLE_MODAL_SIDEBAR: null,
  SEARCH_IMAGES: null,
  SEARCH_RESULTS: null,
  GET_IMAGES: null,
  GET_ALL_AUTHORS: null,
  MODAL_INDEX: null,
  SET_IMAGE_FILTERS: null
});

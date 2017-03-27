"use strict";

var _ = require('lodash');
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _visible = false;
var _sidebarVisible = false;
var _modalTitle = "";
var _modalImageIndex = 0;
var _nextImages = {};


var ModalStore = assign({}, EventEmitter.prototype, {
      
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

	emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  isModalVisible: function() {
    return _visible;
  },

  getModalTitle: function() {
    return _modalTitle;
  },


  getModalSidebar: function() {
    return _sidebarVisible;  
  },

  getNextPrev: function() {
    return _nextImages;
  },
     
  getModalImageIndex: function() {
    return _modalImageIndex;
  }

});


Dispatcher.register(function(action) {
	switch(action.actionType) {

		case ActionTypes.SHOW_MODAL:
      _visible = true;
      _modalTitle = action.modalTitle;
      _modalImageIndex = action.index;
      ModalStore.emitChange();
			break;

		case ActionTypes.HIDE_MODAL:
      _visible = false;
      _modalTitle = action.modalTitle;
      ModalStore.emitChange();
			break;

		case ActionTypes.TOGGLE_MODAL_SIDEBAR:
      _sidebarVisible = _sidebarVisible ? false : true;
      ModalStore.emitChange();
			break;

    case ActionTypes.MODAL_INDEX:
      _modalImageIndex =  _modalImageIndex + action.direction;
      ModalStore.emitChange();
      break;

		default:
			// no operations
	}
});

module.exports = ModalStore;

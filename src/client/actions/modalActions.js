"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var Api = require('../api/imagesApi');
var ActionTypes = require('../constants/actionTypes');


var ModalActions = {

  showModal: function(i) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SHOW_MODAL,
      index: i
    });
  },

  hideModal: function() {
    Dispatcher.dispatch({
      actionType: ActionTypes.HIDE_MODAL
    });
  },

  toggleSidebar: function() {
    Dispatcher.dispatch({
      actionType: ActionTypes.TOGGLE_MODAL_SIDEBAR
    });
  },
  
  getNextPrev: function(direction) {
    Dispatcher.dispatch({
      actionType: ActionTypes.MODAL_INDEX,
      direction: direction
    });
  },

}


module.exports = ModalActions;

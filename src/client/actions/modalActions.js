"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var Api = require('../api/imagesApi');
var ActionTypes = require('../constants/actionTypes');


var ModalActions = {

  showModal: function(data) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SHOW_MODAL,
      image: data
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
  }
}


module.exports = ModalActions;

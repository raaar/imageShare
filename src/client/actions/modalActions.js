"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var Api = require('../api/imagesApi');
var ActionTypes = require('../constants/actionTypes');


var ModalActions = {

  showModal: function(data) {
    console.info('open image: ', data); 

    Dispatcher.dispatch({
      actionType: ActionTypes.SHOW_MODAL,
      modalTitle: "this is a modal",
      image: data
    });
  },

  hideModal: function() {
    console.log('action hide modal');

    Dispatcher.dispatch({
      actionType: ActionTypes.HIDE_MODAL
    });
  },

  toggleSidebar: function() {
    console.log('action hide modal');

    Dispatcher.dispatch({
      actionType: ActionTypes.TOGGLE_MODAL_SIDEBAR
    });
  }
}


module.exports = ModalActions;

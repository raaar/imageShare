"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var Api = require('../api/imagesApi');
var ActionTypes = require('../constants/actionTypes');


var ModalActions = {

  showModal: function(data, i) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SHOW_MODAL,
      image: data,
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
  
  getNextPrev: function(id, q, direction) {
    var _id = id;
    var query = "";

    for( var key in q) {
      if( key === "author") {
        query = "?author=" + q.author    
      }
    };

    Dispatcher.dispatch({
      actionType: ActionTypes.MODAL_INDEX,
      direction: direction
    });
    
    
    /*              
    Api.get('api/images/' + _id + '/' + direction + query)
      .then(function(data) {

        if(typeof data !== 'undefined' && data.length > 0) {
          Dispatcher.dispatch({
            actionType: ActionTypes.GET_NEXT_PREV,
            data: data
          });
        }
      });
    */
  },




}


module.exports = ModalActions;

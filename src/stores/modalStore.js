var _ = require('lodash');
//var ActionTypes = require('../constants/actionTypes');
//var EventEmitter = require('events').EventEmitter;
//var CHANGE_EVENT = 'change';


import AppDispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';


var _visible = false;
var _sidebarVisible = false;
var _modalTitle = "";
var _modalImageIndex = 0;
var _nextImages = {};


class ModalStoreClass extends EventEmitter {
      
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

	emitChange() {
    this.emit(CHANGE_EVENT);
  }

  isModalVisible() {
    return _visible;
  }

  getModalTitle() {
    return _modalTitle;
  }


  getModalSidebar() {
    return _sidebarVisible;
  }

  getNextPrev() {
    return _nextImages;
  }
     
  getModalImageIndex() {
    return _modalImageIndex;
  }

}


const ModalStore = new ModalStoreClass();


ModalStore.dispatchToken = AppDispatcher.register(action => {
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
      _modalImageIndex += action.direction;
      ModalStore.emitChange();
      break;

		default:
			// no operations
	}
});

export default ModalStore;

var _ = require('lodash');
//var Dispatcher = require('../dispatcher/appDispatcher');
//var ActionTypes = require('../constants/actionTypes');
//var EventEmitter = require('events').EventEmitter;
//var assign = require('object-assign');

import AppDispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

var _authors = [];


class AuthorStoreClass extends EventEmitter {

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }


  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }


  emitChange() {
    this.emit(CHANGE_EVENT);
  }


  getAll() {
    return _authors;
  }

};


const AuthorStore = new AuthorStoreClass();



AuthorStore.dispatchToken = AppDispatcher.register((action) => {
  switch(action.actionType) {
    case ActionTypes.GET_ALL_AUTHORS:
      _authors = action.authors;
      AuthorStore.emitChange();
    break;

    default:
      //
  }
});


export default AuthorStore;

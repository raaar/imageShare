"use strict";

var _ = require('lodash');
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';


var _folders = [];
var _singleFolder;

var FolderStore = assign({}, EventEmitter.prototype, {

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

	emitChange: function() {
    this.emit(CHANGE_EVENT);
  },


  getFolders: function() {
    return _folders;
  },


  getFolderById: function() {
    return _singleFolder;
  }
});


Dispatcher.register(function(action) {
	switch(action.actionType) {


    case ActionTypes.FOLDER_CREATE: 
			_folders.push(action.folder);
			FolderStore.emitChange();
			break;


    case ActionTypes.FOLDER_GET: 
			_folders = action.folders;
			FolderStore.emitChange();
			break;


    case ActionTypes.FOLDER_GET_SINGLE: 
			_singleFolder = action.folder;
			FolderStore.emitChange();
			break;


    case ActionTypes.FOLDER_DELETE: 
			_.remove(_folders, function(folder){
        return folder._id === action.id;
			});
			FolderStore.emitChange();
			break;


		default:
			// no operations
	}
});

module.exports = FolderStore;

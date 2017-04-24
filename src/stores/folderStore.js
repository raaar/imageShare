import AppDispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

import _ from 'lodash';


var _folders = [];
var _singleFolder;


class FolderStoreClass extends EventEmitter {

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

	emitChange() {
    this.emit(CHANGE_EVENT);
  }


  getFolders() {
    return _folders;
  }


  getFolderById() {
    return _singleFolder;
  }
  
  
  clearCache() {
    _singleFolder = {};
  }
}


const FolderStore = new FolderStoreClass();


AppDispatcher.register(action => {
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


export default FolderStore;
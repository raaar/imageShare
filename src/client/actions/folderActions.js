"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var toastr = require('toastr');
var axios = require('axios');


var FolderActions = {


  createFolder: function(form) {
    console.info('actions: ', form);
    var config = {};

    axios.post('api/folders', form, config)
      .then(function(data) {
        console.log('dispatch folder');
        Dispatcher.dispatch({
			    actionType: ActionTypes.FOLDER_CREATE,
		      folder: data.data 
	      });
      });
  },



  loadFolders: function() {
    axios.get('api/folders')
      .then(function(data){
        console.log(data);
        Dispatcher.dispatch({
			    actionType: ActionTypes.FOLDER_GET,
		      folders: data.data 
	      });
      });
  },


  getSingle: function(id) {

    axios.get('api/folders/' + id )
      .then(function(data){
              
        console.info('folder single action: ', data.data);
        Dispatcher.dispatch({
			    actionType: ActionTypes.FOLDER_GET_SINGLE,
		      folder: data.data 
	      });
        
      });
  },


  updateFolder: function(item) {
    var config = {};
    // update 
          
    axios.patch('api/folders/' + item._id, item, config)
      .then(function(data){
      })
      .catch(function(error) {
        console.log(error); 
      });
      
  },


  delete: function(id) {
    axios.delete('api/folders/'+ id )
      .then(function (response) {
        console.log(response);
        Dispatcher.dispatch({
			    actionType: ActionTypes.FOLDER_DELETE,
		      id: id
	      });
      })
      .catch(function(error) {
        console.log(error); 
      });
  }

};


module.exports = FolderActions;

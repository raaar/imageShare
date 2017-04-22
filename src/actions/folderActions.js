import AppDispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
//var toastr = require('toastr');
var axios = require('axios');


export default {


  createFolder: function(form) {
    console.info('actions: ', form);
    var config = {};

    axios.post('/api/folders', form, config)
      .then(function(data) {
        console.log('dispatch folder');
        AppDispatcher.dispatch({
			    actionType: ActionTypes.FOLDER_CREATE,
		      folder: data.data
	      });
      });
  },



  loadFolders: function() {
    axios.get('api/folders')
      .then(function(data){
        console.log(data);
        AppDispatcher.dispatch({
			    actionType: ActionTypes.FOLDER_GET,
		      folders: data.data
	      });
      });
  },


  getSingle: function(id) {

    console.log(id);
    axios.get('/api/folders/' + id )
      .then(function(data){
              
        AppDispatcher.dispatch({
			    actionType: ActionTypes.FOLDER_GET_SINGLE,
		      folder: data.data
	      });
        
      });
  },


  updateFolder: function(item) {
    var config = {};
    // update

    axios.patch('/api/folders/' + item._id, item, config)
      .then(function(data){
      })
      .catch(function(error) {
        console.log(error);
      });
      
  },


  delete: function(id) {
    axios.delete('/api/folders/'+ id )
      .then(function (response) {
        console.log(response);
        AppDispatcher.dispatch({
			    actionType: ActionTypes.FOLDER_DELETE,
		      id: id
	      });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

};
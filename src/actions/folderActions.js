import AppDispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import Notify from '../components/common/notify';
import dictionary from '../../dictionary/dictionary';
import axios from 'axios';


export default {

  createFolder: function(form) {
    var config = {};
    
    axios.post('/api/folders', form, config)
      .then(function(data) {
        Notify.success(dictionary.client.folderCreated);
        
        AppDispatcher.dispatch({
			    actionType: ActionTypes.FOLDER_CREATE,
		      folder: data.data
	      });
      });
  },


  loadFolders: function() {
    
    axios.get('api/folders')
      .then(function(data){
        AppDispatcher.dispatch({
			    actionType: ActionTypes.FOLDER_GET,
		      folders: data.data
	      });
      });
  },


  getSingle: function(id) {

    axios.get('/api/folders/' + id )
      .then(function(data){
              
        AppDispatcher.dispatch({
			    actionType: ActionTypes.FOLDER_GET_SINGLE,
		      folder: data.data
	      });
        
      });
  },


  updateFolder: function(item) {

    axios.patch('/api/folders/' + item._id, item, {} )
      .then(function(data){
      })
      .catch(function(error) {
        console.log(error);
      });
      
  },


  delete: function(id) {
    axios.delete('/api/folders/'+ id )
      .then(function (res) {
        Notify.success(res.data.message);
        
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
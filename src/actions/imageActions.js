import AppDispatcher from '../dispatcher/appDispatcher';
import s3Signature from '../api/s3Sign';
import ActionTypes from '../constants/actionTypes';
import toastr from 'toastr';
import axios from 'axios';


export default {

  loadImages: function(q) {

    console.info('load image query: ', q);

    axios.get('/api/images/fetch', {
      params: q
    })
    .then(function (data) {

      AppDispatcher.dispatch({
        actionType: ActionTypes.GET_IMAGES,
        gallery: data.data
      });

    })
    .catch(function (error) {
      console.log(error);
    });
  },


	createImage: function(form, file, folderId) {
	  
    s3Signature(file, function(file, signedRequest, url){
      
      toastr.warning('Uploading image');
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){

            var uploadData = {
              folderId: folderId,
              formData: form,
              id: file.id,
              lastModified: file.lastModified,
              lastModifiedDate: file.lastModifiedDate,
              type: file.type,
              size: file.size
            };

            var config = {};

            axios.post('api/images', uploadData, config)
              .then(function (data) {
                AppDispatcher.dispatch({
			            actionType: ActionTypes.CREATE_IMAGE,
		              image: data.data
	              });
              })
              .catch(function (error) {
                console.log(error);
              });
          }
          else{
            alert('Could not upload file.');
          }
        }
      };
      xhr.send(file);
    });
  },


  deleteImage: function(id) {
    
    var url = "api/images/" + id;
 
    axios.delete(url)
      .then(function (response) {
        console.log(response);
        AppDispatcher.dispatch({
          actionType: ActionTypes.DELETE_IMAGE,
          id: id
		    });
      })
      .catch(function (error) {
        console.log(error);
      });
      
  },


  setImageQuery: function(filters) {
    
    AppDispatcher.dispatch({
      actionType: ActionTypes.SET_IMAGES_QUERY,
      filters: filters
    });
    
  }
};

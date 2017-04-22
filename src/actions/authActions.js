import AppDispatcher from '../dispatcher/appDispatcher';
import axios from 'axios';
import ActionTypes from '../constants/actionTypes';
var s3Signature = require('../api/s3Sign');


export default {

  login: (credentials) => {

    axios.post('auth/signIn', credentials, {})
    .then((data) => {
      AppDispatcher.dispatch({
        actionType: ActionTypes.AUTH_LOGIN,
        auth: true,
        user: data.data.user
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  },


  logout: () => {

    axios.post('auth/logout')
      .then((data) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.AUTH_LOGOUT
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  },


  saveAvatar: function(data, file) {

    s3Signature(file, function(file, signedRequest, url){

      var xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){

            var uploadData = {
              id: data.fileName
            };

            axios.post('api/user/avatar', uploadData, {})
              .then(function (data) {
                AppDispatcher.dispatch({
                  actionType: ActionTypes.AVATAR_UPDATE,
                  image: data.data
                });
              })
              .catch(function (error) {
                console.log(error);
              });

          } else{
            alert('Could not upload file.');
          }
        }
      };
      xhr.send(file);
    });
  },
};
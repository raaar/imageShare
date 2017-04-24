import AppDispatcher from '../dispatcher/appDispatcher';
import axios from 'axios';
import ActionTypes from '../constants/actionTypes';
import Notify from '../components/common/notify';
import dictionary from '../../dictionary/dictionary';

var s3Signature = require('../api/s3Sign');


export default {

  login: (credentials) => {

    axios.post('/auth/login', credentials, {})
    .then((data) => {
      
      Notify.success(data.data.message);
      
      AppDispatcher.dispatch({
        actionType: ActionTypes.AUTH_LOGIN,
        auth: true,
        user: data.data.user
      });
    })
    .catch(function (error) {
      Notify.error(dictionary.client.authLoginInvalid);
      console.error(error);
    });
  },


  logout: () => {

    axios.post('/auth/logout')
      .then((data) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.AUTH_LOGOUT
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  },


  register: (data) => {
    
    axios.post('/auth/register', data, {})
      .then((data) => {
        
        if(data.data.status === 'success') {
          Notify.success(data.data.message);
          
          AppDispatcher.dispatch({
            actionType: ActionTypes.AUTH_LOGIN,
            user: data.data.user
          });
        } else {
          // handle errors (user already exists, password too weak)
          Notify.error(data.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  
  
  saveAvatar: function(data, file) {

    s3Signature(file, function(file, signedRequest, url){

      // TODO: clean up code and use promises
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
            alert(dictionary.client.uploadError);
          }
        }
      };
      xhr.send(file);
    });
  },
};
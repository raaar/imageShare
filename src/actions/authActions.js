import AppDispatcher from '../dispatcher/appDispatcher';
import axios from 'axios';
import ActionTypes from '../constants/actionTypes';


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
  }
}



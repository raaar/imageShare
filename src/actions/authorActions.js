import AppDispatcher from '../dispatcher/appDispatcher';
import axios from 'axios';
import ActionTypes from '../constants/actionTypes';


export default {

  getAll: () => {
    axios.get('api/profile/all')
      .then(function(data) {
        AppDispatcher.dispatch({
          actionType: ActionTypes.GET_ALL_AUTHORS,
          authors: data.data 
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}



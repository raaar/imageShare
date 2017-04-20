import AppDispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';


export default {

  showModal: (i) => {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SHOW_MODAL,
      index: i
    });
  },

  hideModal: () => {
    AppDispatcher.dispatch({
      actionType: ActionTypes.HIDE_MODAL
    });
  },

  toggleSidebar: () => {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TOGGLE_MODAL_SIDEBAR
    });
  },
  
  getNextPrev: (direction) => {
    AppDispatcher.dispatch({
      actionType: ActionTypes.MODAL_INDEX,
      direction: direction
    });
  },

}
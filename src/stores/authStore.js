import AppDispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import { EventEmitter } from 'events';


const CHANGE_EVENT = 'change';


// add user data to session storage
function setUser(user) {
  if (!sessionStorage.getItem('user')) {
    sessionStorage.setItem('user', JSON.stringify(user));
    //sessionStorage.setItem('id_token', token);
  }
}

function updateUser(user) {
  sessionStorage.setItem('user', JSON.stringify(user));
}


function logoutUser() {
  sessionStorage.clear();
}


class AuthStoreClass extends EventEmitter {


  emitChange() {
    this.emit(CHANGE_EVENT);
  }


  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }


  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }


  isAuthenticated() {
    if (sessionStorage.getItem('user')) {
      return true;
    }

    return false;
  }


  getUser() {
    return JSON.parse(sessionStorage.getItem('user'));
  }

};


const AuthStore = new AuthStoreClass();


AuthStore.dispatchToken = AppDispatcher.register(action => {
  switch(action.actionType) {


    case ActionTypes.AUTH_LOGIN:
      setUser(action.user);
      AuthStore.emitChange();
      break


    case ActionTypes.AUTH_LOGOUT:
      logoutUser();
      AuthStore.emitChange();
      break;


    case ActionTypes.AVATAR_UPDATE:
      let userObj = AuthStore.getUser();
      userObj.avatar = action.image.id;
      updateUser(userObj);
      AuthStore.emitChange();

    // eslint-disable-next-line
    default:
      /* falls through */
  }
});

// explenation on the export:
// https://www.kevinhooke.com/2017/03/19/react-flux-store-addchangelistener-is-not-a-function/

export default AuthStore;

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import AuthStore from './stores/authStore';

import AuthForm from './components/auth/login';
import AuthorProfile from './components/profile/authorProfile';
import Feed from './components/feed/feedContainer';
import Folders from './components/folders/foldersContainer';
import Header from './components/common/header';
import Modal from './components/modal/modalGalleryContainer';
import Network from './components/network/networkContainer';
import NotFound from './components/pageNotFound';
import Profile from './components/profile/userProfile';
import Upload from './components/upload/uploadContainer';


class App extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: AuthStore.isAuthenticated()
    }

    this.onChange = this.onChange.bind(this);
  }


  componentWillMount() {
    AuthStore.addChangeListener(this.onChange);
  }


  componentDidMount() {
  }


  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onChange);
  }


  onChange() {
    this.setState({
      authenticated: AuthStore.isAuthenticated()
    });
  }


  render() {
    return (
      <Router>
        <div>
    
          <div>
            {this.state.authenticated ? (
              <div>
                <Header />
                <Switch>
                  <Route exact path='/' render={() => ( <Redirect to="/feed" /> )} />
                  <Route path='/profile' component={AuthorProfile} />
                  <Route path='/feed' component={Feed} />
                  <Route path='/upload' component={Upload} />
                  <Route path='/folders' component={Folders} />
                  <Route path='/my-profile' component={Profile} />
                  <Route path='/network' component={Network} />
                  <Route component={NotFound}/>
                </Switch>
                <Modal />
              </div>
            ) : (
              <div>
                <AuthForm />
                <Route path='/' render={() => ( <Redirect to="/" /> )} />
              </div>
            )}
          </div>
    
        </div>
      </Router>
    )
  }
};


export default App;

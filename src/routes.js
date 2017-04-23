import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import AuthStore from './stores/authStore';

import AuthForm from './components/auth/authContainer';
import AuthorProfile from './components/profile/authorProfile';
import Feed from './components/feed/feedContainer';
import Folders from './components/folders/foldersContainer';
import Folder from './components/folders/folderSingle';
import Header from './components/common/header';
import ManageFolderPage from './components/folders/manageFolderPage';
import Modal from './components/modal/modalGalleryContainer';
import Network from './components/network/networkContainer';
import NotFound from './components/pageNotFound';
import Preview from './components/preview/previewContainer';
import Profile from './components/profile/userProfile';


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
                  <Route exact path='/' render={() => ( <Redirect to='/feed' /> )} />
                  <Route path='/auth' render={() => ( <Redirect to='/feed' /> )} />
                  
                  <Route path='/profile' component={AuthorProfile} />
                  <Route path='/feed' component={Feed} />
                  <Route exact path='/folders' component={Folders} />
                  <Route exact path='/folders/folder' component={Folder} />
                  <Route exact path='/folders/folder/create' component={ManageFolderPage} />
                  <Route exact path='/folders/folder/manage' component={ManageFolderPage} />
                  <Route path='/my-profile' component={Profile} />
                  <Route path='/network' component={Network} />
                  <Route component={NotFound}/>
                </Switch>
                <Modal />
              </div>
            ) : (
              <div>
                <Switch>
                  <Route path='/auth' component={AuthForm} />
                  <Route exact path='/preview' component={Preview} />
                  <Route path='/' render={() => ( <Redirect to='/auth/register' /> )} />
                </Switch>
              </div>
            )}
          </div>
    
        </div>
      </Router>
    )
  }
};


export default App;

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import App from './App';
import Feed from './components/feed/feedContainer';
import Network from './components/network/networkContainer';
import Profile from './components/profile/userProfile';
import NotFound from './components/pageNotFound';


const Routes = (props) => (
  <Router {...props}>
    <div>
      <Route component={App} />
      <Switch>
        <Route exact path='/' component={Feed} />
        <Route path='/profile' component={Profile} />
        <Route path='/network' component={Network} />
        <Route component={NotFound}/>
      </Switch>
    </div>
  </Router>
);


export default Routes;

import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route
} from 'react-router-dom';

import App from './App';
import Main from './Main';
import NotFound from './client/components/pageNotFound';


const Routes = (props) => (
  <Router {...props}>
    <div>
      <Route path="/" component={App} />
      <Route path="/main" component={Main} />
      <Route path="/404" component={NotFound}/>
      <Redirect from='*' to='/404' />
    </div>
  </Router>
);


export default Routes;

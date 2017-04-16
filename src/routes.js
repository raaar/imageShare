import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import App from './App';
import Main from './Main';
import NotFound from './components/pageNotFound';


const Routes = (props) => (
  <Router {...props}>
    <div>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/main' component={Main} />
        <Route component={NotFound}/>
      </Switch>
    </div>
  </Router>
);


export default Routes;

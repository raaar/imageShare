import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/*
 * Queries to API work:
var axios = require('axios');
    axios.get('/api/images/fetch')
    .then(function (data) {
      console.info('loadImages: ', data);
    })
    .catch(function (error) {
      console.log(error);
    });
*/

class App extends Component {
  render() {
    return(
    <div>
      <Link to="/">Home</Link>
      <Link to="/main">Main</Link>
    </div>
    )
  }
}

export default App;


/*
var React = require('react');
var Router = require('react-router');
var routes = require('./client/routes');
var InitializeActions = require('./client/actions/initializeActions');

InitializeActions.initApp();

Router.run(routes, Router.HistoryLocation,  function(Handler) {
  React.render(<Handler />, document.getElementById('app'));
});
*/

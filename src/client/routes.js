"use strict";

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
  <Route name="app" path="/" handler={require('./components/app')} >
    <DefaultRoute handler={require('./components/homePage')} />
  </Route>
);

module.exports = routes;


/*
Redirects:

3 ways to use redirects:

<Redirect from="about-us" to="about" /> // page has changed name
<Redirect from="awthors" to="authors" /> // correct common spelling mistakes
<Redirect from="about/*" to="about" /> // any sub page can be redirected back to to parent


Path:

the path attribute determines the thext of the URL. If this is not set, it will then default to the 'name' attribute
*/


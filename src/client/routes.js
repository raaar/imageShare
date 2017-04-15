"use strict";

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;


function requireAuth(nextState, replaceState) {
  console.log('auth');
}

var routes = (
  <Route name="app" path="/" handler={require('./components/app')} onEnter={requireAuth}>
    <DefaultRoute handler={require('./components/homePage')} />
    <Route name="login" path="login" handler={require('./components/auth/login')} />
    <Route name="feed" path="feed" handler={require('./components/homePage')} />
    <Route name="image" path="image/:id" handler={require('./components/image/imageSingle')} />
    <Route name="profile" path="profile/:author" handler={require('./components/profile/authorPage')} />
    <Route name="my-profile" path="my-profile" handler={require('./components/profile/userPage')} />
    <Route name="network" path="network" handler={require('./components/network/network')} />
    <Route name="folders" path="folders" handler={require('./components/folders/foldersContainer')} />
    <Route name="addFolder" path="manage-folder" handler={require('./components/folders/manageFolderPage')} />
    <Route name="manage-folder" path="manage-folder/:id" handler={require('./components/folders/manageFolderPage')} />
    <Route name="folderSingle" path="folder/:id/:title" handler={require('./components/folders/folderSingle')} />
    <Route name="search" path="search" handler={require('./components/search/searchPage')} />
    <NotFoundRoute handler={require('./components/pageNotFound')} />
    <Redirect from="/" to="feed"  />
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


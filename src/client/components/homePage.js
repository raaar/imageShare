'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
  render: function() {
    return (
      <div className="jumbotron">
        <h1>Pluralsight administration</h1>
        <p>We are using React & Flux</p>
      </div>
      );
  }
});

module.exports = Home;

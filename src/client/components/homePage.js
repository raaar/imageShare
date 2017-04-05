'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ImageGridContainer = require('./image/imageGridContainer');

var Home = React.createClass({
  render: function() {
    return (
      <div>
        <ImageGridContainer gridSize="large" query={{limit: 20}} />
      </div>
    );
  }
});

module.exports = Home;

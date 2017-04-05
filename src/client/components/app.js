'use strict';

var React = require('react');
var Header = require('./common/header');
var ModalGallery = require('./modal/galleryContainer');
var RouteHandler = require('react-router').RouteHandler;


var App = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        <RouteHandler />
        <ModalGallery />
      </div>
      );
  }
});

module.exports = App;

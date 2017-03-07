/* eslint-disable strict*/ // Disable check, as jQuery global var is being flagged

var React = require('react');
var Header = require('./common/header');
var ModalGallery = require('./common/modalGallery');
var RouteHandler = require('react-router').RouteHandler;
// $ = jQuery = require('jquery');


var App = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
           <RouteHandler />
        </div>
        <ModalGallery />
      </div>
      );
  }
});

module.exports = App;

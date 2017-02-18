'use strict';

var React = require('react');
var Link = require('react-router').Link;

var NotFoundPage = React.createClass({
  render: function() {
    return (
        <div>
          <h1>404</h1>
          
          <p>
            Sorry, page not found
          </p>
          
          <Link to="app" className="btn btn-primary">Back to home</Link>
        </div>
      );
  }
});

module.exports = NotFoundPage;

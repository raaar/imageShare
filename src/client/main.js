"use strict";

var React = require('react/addons');

var Home = React.createClass({
  render: function() {
      return (
        <div>
            -- Hello! This is a React component      
        </div>
      );
  }
})

React.render(<Home />,app)

var React = require('react');


var fileInput = React.createClass({
  render: function() {
    return (
      <input type="file" name="image" />  
    )
  }
});

module.exports = fileInput

var React = require('react');


var fileInput = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <input
            type="file"
            name="image" 
            ref="file" 
            onChange={this.props.onChange}
      />  
    )
  }
});

module.exports = fileInput

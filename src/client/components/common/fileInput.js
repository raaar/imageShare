var React = require('react');


var fileInput = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <input
            type="file"
            name={this.props.name}
            onChange={this.props.onChange}
      />  
    )
  }
});

module.exports = fileInput

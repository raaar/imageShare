"use strict";

var React = require('react');

var SearchForm = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },


  render: function() {
    return (
      <div>
        <input
          type="text" 
          className="form-control" 
          placeholder="Search"
          onChange={this.props.onChange}
          value={this.props.query}
        />
      </div>
    );  
  }
});


module.exports = SearchForm;

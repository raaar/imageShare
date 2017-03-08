"use strict";

var React = require('react');

var SearchForm = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },


  render: function() {
    return (
      <div className="search-box">
        <input
          type="text" 
          className="form-control" 
          placeholder="Search"
          onChange={this.props.onChange}
          value={this.props.query}
        />
        <button type="submit" className="btn btn-default" onClick={this.props.onSearch}>Search</button>
      </div>
    );  
  }
});


module.exports = SearchForm;

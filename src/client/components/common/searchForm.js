"use strict";

var React = require('react');

var SearchForm = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },


  render: function() {
    return (
      <div>
        <form className="navbar-form navbar-left">
          <div className="form-group">
            <input
              type="text" 
              className="form-control" 
              placeholder="Search"
              onChange={this.props.onChange}
              value={this.props.query}
            />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );  
  }
});


module.exports = SearchForm;

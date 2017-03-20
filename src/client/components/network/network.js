'use strict';

var React = require('react');
var Router = require('react-router');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var Router = require('react-router');
var Link = Router.Link;
var config = require('../../../../config');


var Network = React.createClass({


  getInitialState: function() {
    return {
      authors: []
    };
  },


  componentDidMount: function() {
    if(this.isMounted()) {
      var getData = AuthorStore.getAll().length > 0 ? AuthorStore.getAll() : AuthorActions.getAll();
      this.setState({
        authors: getData 
      });
    } 
  },

	componentWillMount: function() {
		AuthorStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		AuthorStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({authors: AuthorStore.getAll()});
	},


  _generateAuthors: function() {
    var createAuthor = function(author) {

      if(author.avatar === undefined) {
        var avatar = "images/placeholder-avatar.png";
      } else {
        var avatar = config.thumbMedium + author.avatar;
      };


      return (
        <div className="col-sm-6 col-md-4 col-lg-4">
          <div className="media" key={author._id}>
            <Link to="profile" params={{author: author.username}}>
              <img className="media__img" src={avatar} /> 
            </Link>
            <div className="truncate">
              <Link to="profile" params={{author: author.username}}>
                {author.username}
              </Link>
            </div>
          </div>
        </div>
      )
    };


    if(this.state.authors !== undefined && this.state.authors.length > 0 ) {
      return (
        <div className="row">
          <div className="media-grid">
	  		    {this.state.authors.map(createAuthor, this)}
          </div>
        </div>
      )
    } 
  },

  render: function() {
    return (
      <div className="container-fluid">
        {this._generateAuthors()}
      </div>
    )
  }

});


module.exports = Network;

"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var UserStore = require('../../stores/userStore');
var UserActions = require('../../actions/userActions');
var SearchForm = require('./searchForm');
var SearchActions = require('../../actions/searchActions');
var SearchStore = require('../../stores/searchStore');
var _ = require('lodash');


var Header = React.createClass({

  mixins: [
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      user: {
        avatar: "http://placehold.it/30x30"
      },
      searchQuery: ""

    };
  },

  componentDidMount: function() {
    // removing user var, and placing call directly in set state
    // if errors occur, revert
    //var user = UserStore.getUser();
 
    if(this.isMounted()) {
      this.setState({
        user: UserStore.getUser(),
        searchQuery: SearchStore.getQuery()
      })
    }
  },

	componentWillMount: function() {
		UserStore.addChangeListener(this._onChange);
		SearchStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		UserStore.removeChangeListener(this._onChange);
		SearchStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    this.setState({
      user: UserStore.getUser(),
      searchQuery: SearchStore.getQuery()
    });

    // Automatically navigate to search page
    var currentRoute = _.last(this.context.router.getCurrentRoutes());
    if(currentRoute.path !== '/search') {
      this.transitionTo('search');
    } 
	},

  logOut: function(data, e) {
    e.preventDefault();

    UserActions.logOut(function(){
      location.href="/";
    });
  },
  
  setSearchState: function(e) {
    SearchActions.query(e.target.value);
  },


  navigateAway: function() {
    var currentRoute = _.last(this.context.router.getCurrentRoutes());
    console.info('current route: ', currentRoute.path);

    if(currentRoute.path !== '/search') {
      console.log('we are not on the search page');
      SearchActions.query("");
      this.setState({
        searchQuery: "" 
      }); 
    } else {
      console.log('we are on the search page');
    }
  },

  render: function() {

    if(this.state.user.avatar === undefined) {
      var avatarUrl = "images/placeholder-avatar.png";
    } else {
      var avatarUrl = "uploads/avatar/xs-" + this.state.user.avatar;
    }

/*
    if(this.state.searchQuery.length > 1) {
      console.info('render query: ', this.state.searchQuery);
      this.transitionTo('search');
    }
*/

    return (
      <div> 
        <nav className="navbar navbar-default">
          <div className="container-fluid">
          
            <Link to="my-profile" className="navbar-brand">
              <img className="avatar-sm" src={avatarUrl} onClick={this.navigateAway} />
            </Link>
          
            <ul className="nav navbar-nav">
              <li><Link to="app">Home</Link></li>
              <li><Link to="upload">Upload</Link></li>
              <li><a href="#" onClick={this.logOut.bind(null, this)} >Logout</a></li>
            </ul>
        
            <SearchForm
              query={this.state.query}
              onChange={this.setSearchState}    
            />
          </div>
       </nav>
     </div>
    );
  }
});

module.exports = Header;

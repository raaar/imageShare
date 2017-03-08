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
      searchQuery: "",
      menuOpen: false
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
    }, function(){
      if(this.state.searchQuery && this.state.searchQuery.length > 0) {
        this.transitionTo('search');
      }
    });
	},

  // moving this function in profile page
  /*
  logOut: function(data, e) {
    e.preventDefault();

    UserActions.logOut(function(){
      location.href="/";
    });
  },
  */
  
  setSearchState: function(e) {
    SearchActions.query(e.target.value);
  },

  toggleMenu: function() {
    if(this.state.menuOpen) {
      this.setState({
        menuOpen:false 
      });
    } else {
      this.setState({
        menuOpen:true 
      });
    }
  },

  closeMenu: function() {
    this.setState({
      menuOpen: false
    })
  },

  render: function() {

    if(this.state.user.avatar === undefined) {
      var avatarUrl = "images/placeholder-avatar.png";
    } else {
      var avatarUrl = "uploads/avatar/xs-" + this.state.user.avatar;
    }

    var hamburgerClass = this.state.menuOpen ? 'hamburger is-active' : 'hamburger';  
    var navClass = this.state.menuOpen ? 'nav is-active' : 'nav';  

    return (
      <div className="nav-clear"> 
        <nav className={navClass}>
          <div className="nav__item--menu" onClick={this.toggleMenu} >
            <div className={hamburgerClass}>
		          <div className="hamburger__bar"></div>
	          </div>
          </div>
          <div className="nav__group">
            <Link to="my-profile" className="nav__item--avatar" onClick={this.closeMenu}>
              <img className="avatar-sm" src={avatarUrl}  />
            </Link>
          
            <Link to="app" className="nav__item" onClick={this.closeMenu}>Home</Link>
            <Link to="upload" className="nav__item" onClick={this.closeMenu}>Upload</Link>

            <div className="nav__item--form"> 
              <SearchForm
                query={this.state.query}
                onChange={this.setSearchState}    
                onSearch={this.closeMenu}    
              />
            </div>
          </div>
       </nav>
     </div>
    );
  }
});

module.exports = Header;

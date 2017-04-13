"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var UserStore = require('../../stores/userStore');
var UserActions = require('../../actions/userActions');
var SearchForm = require('./searchForm');
var ImageActions = require('../../actions/imageActions');
var ImageStore = require('../../stores/imageStore');
var _ = require('lodash');
var config = require('../../../../config');


var Header = React.createClass({

  mixins: [
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      user: {
        avatar: "http://placehold.it/30x30"
      },
      menuOpen: false
    };
  },

  componentDidMount: function() {
    if(this.isMounted()) {
      this.setState({
        user: UserStore.getUser()
      })
    }
  },

	componentWillMount: function() {
		UserStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		UserStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    this.setState({
      user: UserStore.getUser()
    });
	},

  
  setSearchState: function(e) {
    var query = {
      title: e.target.value
    }

    if(e.target.value.length > 1) {
      ImageActions.setImageQuery(query);
      ImageActions.loadImages(query);
      this.transitionTo('search');
    }
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
      var avatarUrl = config.thumbXSmall + this.state.user.avatar;
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
            <Link to="my-profile" className="nav__item nav__item--avatar" activeClassName="is-active" onClick={this.closeMenu}>
              <img className="avatar-sm" src={avatarUrl}  />
            </Link>
          
            <Link to="feed" className="nav__item" onClick={this.closeMenu} activeClassName="is-active">Feed</Link>
            <Link to="network" className="nav__item" onClick={this.closeMenu} activeClassName="is-active">Network</Link>
            <Link to="folders" className="nav__item" onClick={this.closeMenu} activeClassName="is-active">Folders</Link>

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

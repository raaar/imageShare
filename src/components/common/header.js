import React, { Component } from 'react';
import { 
  NavLink
} from 'react-router-dom';
import AuthStore from '../../stores/authStore';
//var UserStore = require('../../stores/userStore');
//var UserActions = require('../../actions/userActions');
//var SearchForm = require('./searchForm');
//var ImageActions = require('../../actions/imageActions');


import placeholderAvatar from '../../img/placeholder-avatar.png';


import _ from 'lodash';
var config = require('../../../config');
import AuthActions from '../../actions/authActions';


class Header extends Component{

  constructor(props, context) {
    super(props, context);

    var usrObj = {};
    usrObj['avatar'] = placeholderAvatar;

    this.state = {
      user: usrObj,
      menuOpen: false
    }

    this.logout = this.logout.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    let usrObj = AuthStore.getUser();
    usrObj['avatar'] = config.thumbXSmall + usrObj['avatar'];

    this.setState({
      user: usrObj
    });
  }

  componentWillMount() {
    //UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    //UserStore.removeChangeListener(this._onChange);
  }

  
  _onChange() {
    this.setState({
      //user: UserStore.getUser()
    });
  }

  
  setSearchState(e) {
    var query = {
      title: e.target.value
    }

    if(e.target.value.length > 1) {
      //ImageActions.setImageQuery(query);
      //ImageActions.loadImages(query);
      this.transitionTo('search');
    }
  }


  toggleMenu() {
    if(this.state.menuOpen) {
      this.setState({
        menuOpen:false 
      });
    } else {
      this.setState({
        menuOpen:true 
      });
    }
  }


  closeMenu(e) {
    e.preventDefault();

    this.setState({
      menuOpen: false
    })
  }


  logout() {
    AuthActions.logout();
  }


  render() {

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
            <NavLink to="/profile" className="nav__item nav__item--avatar" activeClassName="is-active">
              <img className="avatar-sm" alt={this.state.user.username} src={this.state.user.avatar}  />
            </NavLink>

            <NavLink to="/" className="nav__item" activeClassName="is-active">Feed</NavLink>
            <NavLink to="/network" className="nav__item" activeClassName="is-active">Network</NavLink>
            <NavLink to="folders" className="nav__item" onClick={this.closeMenu} >Folders</NavLink>
            <a href="#" onClick={this.logout}>Logout</a>

            <div className="nav__item--form"> 
            </div>
          </div>
       </nav>
     </div>
    );
  }
};

export default Header;
//module.exports = Header;
/*
              <SearchForm
                query={this.state.query}
                onChange={this.setSearchState}    
                onSearch={this.closeMenu}    
              />
*/

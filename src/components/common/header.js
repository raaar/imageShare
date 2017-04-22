import React, { Component } from 'react';
import {
  NavLink
} from 'react-router-dom';
import AuthStore from '../../stores/authStore';

import _ from 'lodash';
import Avatar from '../common/avatar';


//var SearchForm = require('./searchForm');


class Header extends Component{

  constructor(props, context) {
    super(props, context);

    this.state = {
      user:  AuthStore.getUser(),
      menuOpen: false
    }

    this.closeMenu = this.closeMenu.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }


  componentWillMount() {
    AuthStore.addChangeListener(this.onChange);
  }
  
  
  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onChange);
  }


  onChange() {
    this.setState({
      user: AuthStore.getUser()
    });
  }


  setSearchState(e) {
  /*
    var query = {
      title: e.target.value
    }
    */

    if(e.target.value.length > 1) {
      //ImageActions.setImageQuery(query);
      //ImageActions.loadImages(query);
      //this.transitionTo('search');
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
    this.setState({
      menuOpen: false
    })
  }


  render() {

    let hamburgerClass = this.state.menuOpen ? 'hamburger is-active' : 'hamburger';
    let navClass = this.state.menuOpen ? 'nav is-active' : 'nav';

    return (
      <div className='nav-clear'>
        <nav className={navClass}>
          <div className='nav__item--menu' onClick={this.toggleMenu} >
            <div className={hamburgerClass}>
              <div className='hamburger__bar'></div>
            </div>
          </div>

          <div className='nav__group'>
            <NavLink to='/my-profile' className='nav__item nav__item--avatar' activeClassName='is-active' onClick={this.closeMenu}>
              <Avatar src={this.state.user.avatar} size="small" />
            </NavLink>
            <NavLink to='/feed' className='nav__item' activeClassName='is-active' onClick={this.closeMenu}>Feed</NavLink>
            <NavLink to='/network' className='nav__item' activeClassName='is-active' onClick={this.closeMenu}>Network</NavLink>
            <NavLink to='/folders' className='nav__item' activeClassName='is-active' onClick={this.closeMenu}>Folders</NavLink>
            <div className='nav__item--form'></div>
          </div>
       </nav>
     </div>
    );
  }
};

export default Header;
/*
              <SearchForm
                query={this.state.query}
                onChange={this.setSearchState}
                onSearch={this.closeMenu}
              />
*/

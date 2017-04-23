import React, { Component } from 'react';
import {
  Redirect,
  Route,
  NavLink
} from 'react-router-dom';
import AuthLoginForm from './login';
import AuthRegisterForm from './registerForm';
import GridWrapper from '../common/gridWrapper';


class AuthContainer extends Component {
  
  
  render() {
    
    return (
      <div className='auth'>
        <GridWrapper>
          <div className='l-center auth-form'>
            <div className='tab tab--2'>
              <NavLink to='/auth/register' className='tab__btn' activeClassName='is-active'>Register</NavLink>
              <NavLink to='/auth/login' className='tab__btn' activeClassName='is-active'>Login</NavLink>
            </div>
            
            <Route exact path='/auth/login' component={AuthLoginForm} />
            <Route exact path='/auth/register' component={AuthRegisterForm} />
            <Route path='/auth' render={() => ( <Redirect to='/auth/register' /> )} />
          </div>
        </GridWrapper>
      </div>
    )
  }
}

//  <Route path='/' render={() => ( <Redirect to='/register' /> )} />
//  <Route exact path='/preview' component={Preview} />

export default AuthContainer;
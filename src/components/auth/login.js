import React, { Component } from 'react';
import TextInput from '../common/textInput';
import AuthActions from '../../actions/authActions';


class LoginForm extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      credentials: {
        username: "",
        password: ""
      }
    };

    /* Bind functions in the constructor.
     * If bound in the render function, a new function will be created on each render
     * causing performance issues
     */
    this.onFormChange = this.onFormChange.bind(this);
    this.login = this.login.bind(this);
  }


  login() {
    AuthActions.login(this.state.credentials);
  }


  onFormChange(e) {
    const credentials = this.state.credentials;
    credentials[e.target.name] = e.target.value;

    this.setState({
      credentials: credentials
    });
  }


  render() {

    return (
      <div>
      
        <h1>Log in</h1>
        
        <TextInput
        name="username"
        label="Username"
        onChange={this.onFormChange}
        type="text"
        dark={true}
        />

        <TextInput
        name="password"
        label="password"
        onChange={this.onFormChange}
        type="password"
        dark={true}
        />

        <button className="btn btn--lg" onClick={this.login}>Login</button>
      </div>
    )
  }
};


export default LoginForm;
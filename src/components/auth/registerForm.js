import React, { Component } from 'react';
import TextInput from '../common/textInput';
import AuthActions from '../../actions/authActions';


class RegisterForm extends Component {

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
    this.register = this.register.bind(this);
  }



  register() {
    AuthActions.register(this.state.credentials);
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
      
        <h1>Register for free</h1>
        
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
      
        <button className="btn btn--lg" onClick={this.register}>Register</button>
        
      </div>
    )
  }
};


export default RegisterForm;
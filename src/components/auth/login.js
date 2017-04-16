import React, { Component } from 'react';
import TextInput from '../common/textInput';


class LoginForm extends Component {

  constructor(props, context) {
    super(props, context);

    /* It's important to bind functions in the constructor.
     * If bound in the render function, a new function will be created on each render
     * causing performance issues
     */
    //this.onTitleChange = this.onTitleChange.bind(this);
    //this.onClickSave = this.onClickSave.bind(this);
    this.auth = this.auth.bind(this);
  }

  auth() {
    console.log('Auth') 
  }

  onChange() {
  
  }

  render() {
    return (
      <div className="container-fluid">
        Login screen

        <TextInput
          name="Username"
          label="Username"
          onChange={this.onChange}
        />


        <button className="btn" onClick={this.auth}>Login</button>


      </div>
    )
  }
};

export default LoginForm;

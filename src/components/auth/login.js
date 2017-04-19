import React, { Component } from 'react';
import TextInput from '../common/textInput';
import AuthActions from '../../actions/authActions';
//import AuthStore from '../../stores/authStore';


class LoginForm extends Component {

  constructor(props, context) {
    super(props, context); 
    this.state = {
      credentials: {
        username: "",
        password: ""
      },
      currentTab: "register"
    };

    /* Bind functions in the constructor.
     * If bound in the render function, a new function will be created on each render
     * causing performance issues
     */
    this.onChange = this.onChange.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.login = this.login.bind(this);
  }


  componentWillMount() {
    //AuthStore.addChangeListener(this.onChange);
  }


  componentDidMount() {
  }


  componentWillUnmount() {
    //AuthStore.removeChangeListener(this.onChange);
  }


  onChange() {
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


  onTabChange(e) {
    console.log('switch tab');
    console.log(this.tabBtnLogin);
  }


  render() {

    let tabClass = `tab__btn `;

    if(this.state.currentTab === 'register') {
      //tabClass += ' is-active';
    }
    



    return (
      <div className="dark-page">
        <div className="container-fluid">

          <div className="container">
            <div className="l-center">
              <div className="start-form">
                <div className="tab tab--2">
                  <a href="#" 
                    className={tabClass} 
                    onClick={this.onTabChange}
                    ref={(tabBtn) => { this.tabBtnRegister = tabBtn; }}
                    >Register</a>

                    <a href="#" 
                      className="tab__btn" onClick={this.onTabChange}
                      ref={(tabBtn) => { this.tabBtnLogin = tabBtn; }} 
                      >Log in</a>
                </div>
              </div>
            </div>
          </div>


          <div className=''>

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

            <button className="btn" onClick={this.login}>Login</button>
          </div>
        </div>
      </div>
    )
  }
};


export default LoginForm;
// TODO: tabs
// https://toddmotto.com/creating-a-tabs-component-with-react/

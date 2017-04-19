import React, { Component } from 'react';
import AuthForm from './components/auth/login';
import Header from './components/common/header';
import AuthStore from './stores/authStore';



class App extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: AuthStore.isAuthenticated() 
    }

    this.onChange = this.onChange.bind(this);
  }


  componentWillMount() {
    AuthStore.addChangeListener(this.onChange);
  }


  componentDidMount() {
  }


  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onChange);
  }


  onChange() {
    this.setState({
      authenticated: AuthStore.isAuthenticated()
    });
  }


  render() {
    return(
    <div>
      {this.state.authenticated ? (
        <div>
          <Header />
          {this.props.children}
        </div>
      ) : (
        <AuthForm />
      )}
    </div>
    )
  }
}

export default App;


/*
 * Queries to API work:
var axios = require('axios');
    axios.get('/api/images/fetch')
    .then(function (data) {
      console.info('loadImages: ', data);
    })
    .catch(function (error) {
      console.log(error);
    });
*/

// https://github.com/mars/heroku-cra-node
//
// https://scotch.io/tutorials/build-a-react-flux-app-with-user-authentication

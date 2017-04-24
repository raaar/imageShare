import React, { Component } from 'react';
import AuthStore from '../../stores/authStore';
import ImageGrid from '../image/imageGridContainer';
const queryString = require('query-string');


class AuthorProfile extends Component {
  
  
  constructor(props, context) {
    super(props, context);
    
    this.q = queryString.parse(this.props.location.search);
    this.user = AuthStore.getUser();
  }
  
  
  componentWillMount() {
    if(this.user.username === this.q.author) {
      this.props.history.push('/my-profile');
    }
  }


  render() {

    return (
      <div>
        <div className="mast">
          <div className="container-fluid">
            <h3>Images by: {this.q.author}</h3>
          </div>
        </div>
        <ImageGrid query={{author: this.q.author}} />
      </div>
    );
  }
};


export default AuthorProfile;

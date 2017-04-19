import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return(
    <div>
      <Link to="/feed">Feed</Link>
      <Link to="/network">Network</Link>
    </div>
    )
  }
}

export default Header;

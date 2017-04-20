import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import Avatar from '../common/avatar';


class NetworkItem extends Component {

  render() {

    const { item } = this.props;

    return (

      <div className="col-sm-6 col-md-4 col-lg-4">
        <div className="media">
          <Link to={{pathname:'/profile', search:`author=${item.username}`}} className="media__img">
            <Avatar src={item.avatar} size='large' />
          </Link>
          <div className="truncate">
            <Link to={{pathname:'/profile', search:`author=${item.username}`}}>
              {item.username}
            </Link>
          </div>
        </div>
      </div>
    )
  }
};





export default NetworkItem;



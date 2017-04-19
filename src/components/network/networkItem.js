import React, { Component } from 'react';
// import {Link} from 'react-router';
import config from '../../../config';
import placeholderAvatar from '../../img/placeholder-avatar.png';


class NetworkItem extends Component {

  render() {

    const { item } = this.props;

    let avatar;

    if(item.avatar === undefined) {
      avatar = placeholderAvatar;
    } else {
      avatar = config.thumbMedium + item.avatar;
    };

    return (

      <div className="col-sm-6 col-md-4 col-lg-4">
        <div className="media" >
          <a href='#'>
            <img className="media__img" src={avatar} alt={item.username} /> 
          </a>
          <div className="truncate">
            <a href="#">
              {item.username}
            </a>
          </div>
        </div>
      </div>
    )
  }
};





export default NetworkItem;



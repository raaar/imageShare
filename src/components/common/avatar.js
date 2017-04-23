import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from '../../../config';
import avatarPlaceholder from '../../img/placeholder-avatar.png';

class Avatar extends Component {

  render() {

    let avatarClass;
    let avatarSrc = this.props.src;


    switch(this.props.size) {
      case 'small':
        avatarClass = 'avatar-sm';
        avatarSrc = config.thumbXSmall + this.props.src;
        break;

      case 'large':
        avatarClass = 'avatar-lg';
        avatarSrc = config.thumbMedium + this.props.src;
        break;

       default:
        avatarSrc = avatarPlaceholder;
    }


    if(this.props.src === undefined) {
       avatarSrc = avatarPlaceholder;
    }

    return (
      <img src={avatarSrc} className={avatarClass} alt="avatar" />
    )
  }
}


Avatar.propTypes = {
  size: PropTypes.string.isRequired,
  src: PropTypes.string
}

export default Avatar;

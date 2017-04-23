import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
//import Avatar from '../common/avatar';
var config = require('../../../config');


class GalleryModal extends Component{


  _getDate() {
   if(this.props.data.image.lastModifiedDate) {
     var lastModified = this.props.data.image.lastModifiedDate;
     var shortDate = lastModified.match(/.+20[0-9]{2}/);
     return (
       <p>Last modified: {shortDate}</p>
     )
   }
  }


  render() {
    
    let url = config.bucketUrl + this.props.data.image.file;
    let isByUser = this.props.data.author === this.props.user.username;
    
    
    return (
      <div className={this.props.modalClass}>
        <div className="modal__nav">
          <div className={this.props.navInfoClass} onClick={this.props.toggleSidebar} >
            Info
          </div>
          <div className="nav__item" onClick={this.props.closeModal}>
            <span className="modal__close">Close</span>
          </div>
        </div>
        <div className="modal__content">
          <img className="modal__img" src={url} alt={this.props.data.image.file} />
        </div>
        <div className="modal__aside">
          <h3>{this.props.data.title}</h3>
          <p>Size: {this.props.data.image.size}kb</p>
          <p>By: <Link to={{pathname:'/profile', search:`author=${this.props.data.author}`}} onClick={this.props.closeModal}>
              {this.props.data.author}
            </Link>
          </p>
          {this._getDate()}
          
          { isByUser &&
  			    <a href="#" onClick={this.props.deleteImage}>Delete</a>
          }
        </div>
      </div>
    )
  }
};


export default GalleryModal;


/*

*/
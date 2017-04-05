"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var config = require('../../../../config');


var GalleryModal = React.createClass({ 


  _authorLink: function() {
    return (
      <div>
        <p>By: <Link to="profile" 
            params={{author: this.props.data.author}} 
            onClick={this.closeModal}>{this.props.data.author}</Link>
        </p>
      </div>
    ); 
  },
        

  _getSize: function() {
    return (
      <p>{this.props.data.size}kb</p>
    ); 
  },


  _getDate: function() {
   if(this.props.data.image.lastModifiedDate) {
     var lastModified = this.props.data.image.lastModifiedDate;
     var shortDate = lastModified.match(/.+20[0-9]{2}/);
     return (
       <p>Last modified: {shortDate}</p>
     )
   }
  },

        
  _deleteButton: function() {
    if(this.props.data.author === this.props.user.userName) {
      return (
        <div>
			    <a href="#" onClick={this.props.deleteImage}>Delete</a>
        </div>
      ) 
    }
  },


  render: function() {
    var url = config.bucketUrl + this.props.data.image.file

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
            <img className="modal__img" src={url} />
          </div>
          <div className="modal__aside">
            <h3>{this.props.data.title}</h3>
                       
            {this._authorLink()}
            {this._getSize()}
            {this._getDate()}
            {this._deleteButton()}
          </div>
      </div>
    )
  }
});


module.exports = GalleryModal;


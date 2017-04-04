"use strict";

var React = require('react');
var ModalStore = require('../../stores/modalStore');
var ModalActions = require('../../actions/modalActions');
var ImageActions = require('../../actions/imageActions');
var ImageStore = require('../../stores/imageStore');
var UserStore = require('../../stores/userStore');
var Router = require('react-router');
var Link = Router.Link;
var _ = require('lodash');
var config = require('../../../../config');


var GalleryModal = React.createClass({
  
  mixins: [
    Router.Navigation
  ],


  getInitialState: function() {
    return {
      data: {
        title: "",
        author: "",
        image: {
          full: ""
        }
      },
      end: false,
      imageQuery: {},
      images: [],
      index: 0,
      sidebarOpen: false,
      user: {},
      visible: false
    }
  },


  componentDidMount: function() {
   
    var user = UserStore.getUser(); // logged in user

    document.onkeydown = function(evt) {
      evt = evt || window.event;
      var isEscape = false;
      if ("key" in evt) {
        isEscape = (evt.key == "Escape" || evt.key == "Esc");
      } else {
        isEscape = (evt.keyCode == 27);
      }
      if (isEscape) {
        this.closeModal();
      }


      if(evt.keyCode == 39 ) {
        this.getNext();
      }
      if(evt.keyCode == 37 ) {
        this.getPrev();
      }
    }.bind(this);


    if(this.isMounted()) {
      this.setState({
        imageQuery: ImageStore.getImageQuery(),
        images: ImageStore.getImages(),
        index: ModalStore.getModalImageIndex(),
        user: user,
        visible: ModalStore.isModalVisible()
      })
    }
  },


  getNext: function(){

    if(this.state.index > this.state.images.length - 5 ) {

      var lastImage = {
        after : this.state.images[this.state.images.length - 1]._id
      }

      var query = Object.assign(lastImage, this.state.imageQuery);
      ImageActions.loadImages(query);
    }


    if(this.state.index < this.state.images.length - 1) {
      ModalActions.getNextPrev(this.state.data._id, this.state.imageQuery, 1 ); 
    } else {
      this._onChange();
    }
  },


  getPrev: function() {
    if(this.state.index !== 0 ) {
      ModalActions.getNextPrev(this.state.data._id, this.state.imageQuery, -1 ); 
    }
  },


	componentWillMount: function() {
		ModalStore.addChangeListener(this._onChange);
	},


	componentWillUnmount: function() {
		ModalStore.removeChangeListener(this._onChange);
	},


	_onChange: function() {
    this.setState({
      images: ImageStore.getImages(),
      index: ModalStore.getModalImageIndex(),
      imageQuery: ImageStore.getImageQuery(),
      sidebarOpen: ModalStore.getModalSidebar(),
      visible: ModalStore.isModalVisible(),
    }, function(){
      this.setState({
        data: this.state.images[ this.state.index ]
      })
    });
	},


  closeModal: function() {
    ModalActions.hideModal();
  },


  deleteImage: function(id, e) {
    e.preventDefault();
    ModalActions.hideModal();
    ImageActions.deleteImage(id); 
    this.transitionTo('app');
  },


  toggleSidebar: function(e) {
    ModalActions.toggleSidebar();
    e.preventDefault();
  },


  _authorLink: function() {
    if(this.state.data.author) {
      return (
        <div>
          <p>By: <Link to="profile" params={{author: this.state.data.author}} onClick={this.closeModal}>{this.state.data.author}</Link></p>
        </div>
      ) 
    }
  },
        

  _getSize: function() {
    if(this.state.data.size) {
      return (
        <p>{this.state.data.size}kb</p>
      ); 
    }
  },


  _getDate: function() {
   if(this.state.data.image.lastModifiedDate) {
     var lastModified = this.state.data.image.lastModifiedDate;
     var shortDate = lastModified.match(/.+20[0-9]{2}/);
     return (
       <p>Last modified: {shortDate}</p>
     )
   }
  },

        
  _deleteButton: function() {
    if(this.state.data.author === this.state.user.userName) {
      return (
        <div>
			    <a href="#" onClick={this.deleteImage.bind(this, this.state.data._id)}>Delete</a>
        </div>
      ) 
    }
  },


  _getImage: function() {
    if(this.state.data.image.file) {
      var url = config.bucketUrl  + this.state.data.image.file

      return (
        <img className="modal__img" src={url} />
      ) 
    }
  },


  render: function() {
    var modalClass;
    var navInfoClass = this.state.sidebarOpen ? 'nav__item is-active' : 'nav__item';
    var authorUrl = "profile/" + this.state.data.author;

    if(this.state.visible && this.state.sidebarOpen) {
      modalClass = 'modal is-visible is-expanded'; 
    } else if (this.state.visible) {
      modalClass = 'modal is-visible';
    } else {
      modalClass = 'modal';
    }


    return (
      <div>
        <div className={modalClass}>
          <div className="modal__nav">
            <div className={navInfoClass} onClick={this.toggleSidebar} >
              Info
            </div>
            <div className="nav__item" onClick={this.closeModal}>
              <span className="modal__close">Close</span>
            </div>
          </div>
          <div className="modal__content">
            {this._getImage()}
          </div>
          <div className="modal__aside">
            <h3>{this.state.data.title}</h3>
            {this._authorLink()}
            {this._getSize()}
            {this._getDate()}
            {this._deleteButton()}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = GalleryModal;

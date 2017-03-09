"use strict";

var React = require('react');
var ModalStore = require('../../stores/modalStore');
var ModalActions = require('../../actions/modalActions');
var ImageActions = require('../../actions/imageActions');
var UserStore = require('../../stores/userStore');
var Router = require('react-router');
var Link = Router.Link;
var _ = require('lodash');

var GalleryModal = React.createClass({
  
  mixins: [
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      visible: false,
      sidebarOpen: false,
      data: {
        title: "",
        author: "",
        image: {
          full: ""
        }
      },
      user: {
      }
    }
  },

  componentDidMount: function() {
    var user = UserStore.getUser(); // logged in user
    console.info('get initial state data: ', this.state.data );
    if(this.isMounted()) {
      this.setState({
        visible: ModalStore.isModalVisible(),
        data: ModalStore.getModalData(),
        user: user
      })
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
      visible: ModalStore.isModalVisible(),
      sidebarOpen: ModalStore.getModalSidebar(),
      data: ModalStore.getModalData()
    });
    console.info('onChange sidebar: ', this.state.sidebarOpen);
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
    console.log('toggle sidebar');
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
        

  _deleteButton: function() {
    if(this.state.data.author === this.state.user.userName) {
      return (
        <div>
          <p>{this.state.data.size}kb</p>
			    <a href="#" onClick={this.deleteImage.bind(this, this.state.data._id)}>Delete</a>
        </div>
      ) 
    }
  },


  _getImage: function() {
    if(this.state.data.image.full) {
      var fileName = this.state.data.image.full;
      var url = "uploads/images/" + fileName;

      return (
        <img className="modal__img" src={url} />
      ) 
    }
  },




  render: function() {
    var modalClass;

    if(this.state.visible && this.state.sidebarOpen) {
      modalClass = 'modalReact is-visible is-expanded'; 
    } else if (this.state.visible) {
      modalClass = 'modalReact is-visible';
    } else {
      modalClass = 'modalReact';
    }

    var authorUrl = "profile/" + this.state.data.author;

    return (
      <div>
        <div className={modalClass}>
          <div className="modal__nav">
            <div className="nav__item" onClick={this.toggleSidebar} >
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
            {this._deleteButton()}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = GalleryModal;

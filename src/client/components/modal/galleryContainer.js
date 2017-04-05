"use strict";

var React = require('react');
var ModalStore = require('../../stores/modalStore');
var ModalActions = require('../../actions/modalActions');
var ImageActions = require('../../actions/imageActions');
var ImageStore = require('../../stores/imageStore');
var UserStore = require('../../stores/userStore');
var Router = require('react-router');
var Gallery = require('./gallery');


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


    // TODO: refactor key events
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


  getNext: function(){

    // If there are less than 5 items left, load some more
    if(this.state.index > this.state.images.length - 5 ) {

      var lastImage = {
        after : this.state.images[this.state.images.length - 1]._id
      }

      var query = Object.assign(lastImage, this.state.imageQuery);
      ImageActions.loadImages(query);
    }


    if(this.state.index < this.state.images.length - 1) {
      ModalActions.getNextPrev(1); 
    } else {
      this._onChange();
    }
  },


  getPrev: function() {
    if(this.state.index !== 0 ) {
      ModalActions.getNextPrev(-1); 
    }
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
      {this.state.visible &&
        <Gallery 
          modalClass={modalClass}
          navInfoClass={navInfoClass} 
          toggleSidebar={this.toggleSidebar}
          closeModal={this.closeModal}
          deleteImage={this.deleteImage}
          data={this.state.data}
          user={this.state.user}
        />
      }
      </div>
    );
  }
});

module.exports = GalleryModal;

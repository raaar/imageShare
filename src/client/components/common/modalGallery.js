"use strict";

var React = require('react');
var ModalStore = require('../../stores/modalStore');
var ModalActions = require('../../actions/modalActions');
var ImageActions = require('../../actions/imageActions');
var Router = require('react-router');
var Link = Router.Link;

var GalleryModal = React.createClass({
  
  mixins: [
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      visible: false,
      title: "",
      imageFull: "",
      data: {
        title: "",
        author: "",
        image: {
          full: "",
          thumb: ""
        }
      }
    }
  },

  componentDidMount: function() {
    if(this.isMounted()) {
      this.setState({
        visible: ModalStore.isModalVisible(),
        data: ModalStore.getModalData()
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
      data: ModalStore.getModalData()
    });
    console.info('onChange: ', this.state.visible);
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
        

  render: function() {
    var modalClass = this.state.visible ? 'modalReact is-visible' : 'modalReact';  
    var fileName = this.state.data.image.full;
    var url = "uploads/images/" + fileName;
    var authorUrl = "profile/" + this.state.data.author;

    console.info('image data: ', this.state.data.image.full );
    var _self = this;
    var deleteButton = function() {
			<a href="#" onClick={_self.deleteImage.bind(_self, _self.state.data._id)}>Delete</a>
      /*      
      if(_self.state.data.author === _self.state.user.userName) {
        return (
          <div>
			      <a href="#" onClick={_self.deleteImage.bind(_self, _self.state.data._id)}>Delete</a>
          </div>
        )
      }
      */
    };

    return (
      <div>
        <div className={modalClass}>
          <span className="modal__close" onClick={this.closeModal}>Close</span>
          <h2>{this.state.data.title}</h2>
          <p>By: <Link to="profile"  onClick={this.closeModal} params={{author: this.state.data.author}}>{this.state.data.author}</Link></p>
          {deleteButton()}
			<a href="#" onClick={this.deleteImage.bind(_self, this.state.data._id)}>Delete</a>
          <img className="modal__img" src={url} />
        </div>
      </div>
    )
  }
});

module.exports = GalleryModal;

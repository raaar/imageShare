import React, { Component } from 'react';

import AuthStore from '../../stores/authStore';
import ImageActions from '../../actions/imageActions';
import ImageStore from '../../stores/imageStore';
import ModalActions from '../../actions/modalActions';
import ModalStore from '../../stores/modalStore';

import Gallery from './modalGallery';


class GalleryModal extends Component {
  
  
  constructor(props, context) {
    super(props, context);
    this.state = {
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
      visible: ModalStore.isModalVisible()
    }

    this.closeModal = this.closeModal.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.user = AuthStore.getUser();
    this.onChange = this.onChange.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    
    
    document.onkeydown = function(evt) {
      evt = evt || window.event;
      var isEscape = false;
      if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
      } else {
        isEscape = (evt.keyCode === 27);
      }
      if (isEscape) {
        this.closeModal();
      }

      if(evt.keyCode === 39 ) {
        this.getNext();
      }
      if(evt.keyCode === 37 ) {
        this.getPrev();
      }
    }.bind(this);
  }
 
 
  componentDidMount() {
   
    // TODO: refactor key events


    //if(this.isMounted()) {
    this.setState({
      imageQuery: ImageStore.getImageQuery(),
      images: ImageStore.getImages(),
      index: ModalStore.getModalImageIndex()
    })
    //}
  }


	componentWillMount() {
		ModalStore.addChangeListener(this.onChange);
	}


	componentWillUnmount() {
		ModalStore.removeChangeListener(this.onChange);
	}


	onChange() {
	  let images = ImageStore.getImages();
    let index = ModalStore.getModalImageIndex();
    
    this.setState({
      data: images[index],
      end: ImageStore.imagesEnd(),
      images: images,
      index: index,
      imageQuery: ImageStore.getImageQuery(),
      sidebarOpen: ModalStore.getModalSidebar(),
      visible: ModalStore.isModalVisible()
    });
	}


  lazyLoad() {
    let lastImage = {
      after : this.state.images[this.state.images.length - 1]._id
    }
    
    let query = Object.assign(lastImage, this.state.imageQuery);
    
    ImageActions.loadImages(query);
  }
  
  
  getNext(){
    // If there are less than 5 items left, load some more
    if(!this.state.end && this.state.index > this.state.images.length - 5 ) {
      this.lazyLoad();
    }


    if(this.state.visible && this.state.index < this.state.images.length - 1) {
      ModalActions.getNextPrev(1);
    } else {
      this.onChange();
    }
  }


  getPrev() {
    if(this.state.visible && this.state.index !== 0 ) {
      ModalActions.getNextPrev(-1);
    }
  }


  closeModal() {
    ModalActions.hideModal();
  }


  deleteImage(e) {
    e.preventDefault();
    ModalActions.hideModal();
    ImageActions.deleteImage(this.state.data._id);
  }
  

  toggleSidebar(e) {
    e.preventDefault();
    ModalActions.toggleSidebar();
  }
  
  
  render() {
    
    let modalClass;
    let navInfoClass = this.state.sidebarOpen ? 'nav__item is-active' : 'nav__item';

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
          user={this.user}
          />
        }
      </div>
    );
  }
};


export default GalleryModal;

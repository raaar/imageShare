import React, { Component } from 'react';
import UploadForm from './uploadForm';
import ModalDialog from '../modal/modalDialog';

import ImageActions from '../../actions/imageActions';
import Notify from '../common/notify';
import dictionary from '../../../dictionary/dictionary';


class UploadPage extends Component {
  
  constructor(props, context) {
    super(props, context);
    this.state = {
      image: {
        title: "",
        file: {
        }
      },
      errors: {},
      dirty: false,
      complete: false,
      processing: false,
      visible: false
    };
  
  
    this.handleFile = this.handleFile.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }
  
  
  componentWillReceiveProps(props) {
    this.setState({
      visible: props.visible
    })
  }
  
  
  handleFile(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    let fileExt;
    let fileNameStamp;
    let newFormData;
    
    // check file type
    switch(file.type) {
      
      case 'image/png':
        fileExt = '.png';
        break;
        
      case 'image/jpeg':
        
        fileExt = '.jpeg';
        break;
        
      default:
      
        Notify.error(dictionary.client.uploadProgress);
        this.setState({
          complete: false
        });
        
        return;
    }
    
    
    // TODO: generate a better file name
    fileNameStamp = Math.round(+new Date()/1000);
    file.id = fileNameStamp + fileExt;
          
    newFormData = {
      title: this.state.image.title,
      folderId: this.props.folder
    }

    reader.onloadend = (e) => {
      this.setState({
        formData: newFormData,
        complete: true,
        file: file
      });
    }

    reader.readAsDataURL(file);
  }
  
  
  uploadImage(e) {

    this.setState({
      processing: true,
      visible: false
    });

    ImageActions.createImage(this.state.formData, this.state.file);
  }
  
  
  render() {
    
    return (
      <ModalDialog visible={this.state.visible}>
        <UploadForm
          isComplete={this.state.complete}
          isProcessing={this.state.processing}
          onChange={this.handleFile}
          onSave={this.uploadImage}
        />
      </ModalDialog>
    )
  }
}


export default UploadPage;
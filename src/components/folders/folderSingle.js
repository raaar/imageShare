import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import FolderActions from '../../actions/folderActions';
import FolderStore from '../../stores/folderStore';
import queryString from 'query-string';

import Uploader from '../upload/uploadContainer';
import ImageGridContainer from '../image/imageGridContainer';


class ImageSingle extends Component {
  
  constructor(props, context) {
    super(props, context);
    this.state = {
      folder: {
        title: ''
      }
    };

    this.onChange = this.onChange.bind(this);
  }


  componentWillMount() {
	 	const cachedFolder = FolderStore.getFolderById();
    const query = queryString.parse(this.props.location.search);
    
		FolderStore.addChangeListener(this.onChange);
    
    if(this.create) {
      return;
    }
    
    // If we are on 'manage folder' page, load data from the store.
    // If no data is available, call the server
	 	if(!cachedFolder) {
      FolderActions.getSingle(query.id);
	 	} else {
      this.setState({
        folder: FolderStore.getFolderById()
      });
	 	}
  }


	componentWillUnmount() {
		FolderStore.removeChangeListener(this.onChange);
	}


  upload(e) {
    e.preventDefault();
  }


	onChange() {
    this.setState({
      folder: FolderStore.getFolderById()
    });
	}


  render() {
    
    return (
      <div>
        <div className="container-fluid">
          <h1>{this.state.folder.title}</h1>
          <Link to={{pathname:'/folders/folder/manage', search:`id=${this.state.folder._id}`}}>Manage folder</Link>
          {this.state.folder.publicPermission && <div>Public folder</div> }
        </div>
        
        {this.state.folder._id &&
          <Uploader folder={this.state.folder._id} />
        }
        
        {this.state.folder._id &&
          <ImageGridContainer query={{folderId: this.state.folder._id}} modifiers="grid--folder" />
        }
      </div>
    )
  }
};


export default ImageSingle;
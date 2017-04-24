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
      },
      uploadVisible: false
    };

    this.toggleUploadDialog = this.toggleUploadDialog.bind(this);
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


  toggleUploadDialog(e) {
    
    e.preventDefault();
    
    this.setState({
      uploadVisible: true
    });
  }


	onChange() {
    this.setState({
      folder: FolderStore.getFolderById()
    });
	}


  _publicLink() {
    
    if(this.state.folder.publicPermission) {
      
      let pubLink = `/preview/?folderId=${this.state.folder._id}`;
      
      return (
        <p>
          This is a public folder. <a href={pubLink} target='_blank'>Share the link</a>.
        </p>
      )
    }
  }
  
  
  render() {
    
    
    
    return (
      <div>
        <div className='mast'>
          <div className='container-fluid'>
          
            <h1>{this.state.folder.title && this.state.folder.title}</h1>
            
            {this._publicLink()}
            
            <div className='mast__menu'>
              <ul className='submenu'>
                <li className='submenu__item'>
                  <Link to={{pathname:'/folders/folder/manage', search:`id=${this.state.folder._id}`}}>
                    <i className="fa fa-cog" aria-hidden="true"></i>
                    <span className='submenu__txt'>
                      Manage folder
                    </span>
                  </Link>
                </li>
                <li className='submenu__item'>
                  <a href='#' onClick={this.toggleUploadDialog}>
                    <i className="fa fa-upload" aria-hidden="true"></i>
                    <span className='submenu__txt'>
                      Upload
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
        
        
            
        {this.state.folder._id &&
          <ImageGridContainer query={{folderId: this.state.folder._id}} modifiers="grid--folder" />
        }
        
        
        {this.state.folder._id &&
          <Uploader visible={this.state.uploadVisible} folder={this.state.folder._id} />
        }
        
      </div>
    )
  }
};


export default ImageSingle;
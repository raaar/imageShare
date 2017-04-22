import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import FolderActions from '../../actions/folderActions';
import FolderStore from '../../stores/folderStore';
import queryString from 'query-string';
//import ImageStore from '../../stores/imageStore';
//import ImageForm from '../image/imageForm';

import Uploader from '../upload/uploadContainer';
import ImageGridContainer from '../image/imageGridContainer';


class ImageSingle extends Component {
  
  constructor(props, context) {
    super(props, context);
    this.state = {
      folder: {
        title: ''
      }
    }

    const query = queryString.parse(this.props.location.search);
    FolderActions.getSingle(query.id);
    
    this.onChange = this.onChange.bind(this);
  }


  componentWillMount() {
		FolderStore.addChangeListener(this.onChange);
  }


  componentDidMount() {
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

//         <Link className="btn" to="manage-folder" params={this.props.params}>Manage</Link>
export default ImageSingle;
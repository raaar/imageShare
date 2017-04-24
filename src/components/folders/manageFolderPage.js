import React, { Component } from 'react';
import queryString from 'query-string';

import FolderActions from '../../actions/folderActions';
import FolderStore from '../../stores/folderStore';
import TextInput from '../common/textInput';


class ManageFolderPage extends Component {
  
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      folder: {
        title: "",
        publicPermission: false
      },
      dirty: false
    };
    
    // define if we are on the 'create' or 'manage' page
    this.create = this.props.location.pathname === '/folders/folder/create' ? true : false;
    this.deleteFolder = this.deleteFolder.bind(this);
    this.onChange = this.onChange.bind(this);
    this.saveFolder = this.saveFolder.bind(this);
    this.setFolderState = this.setFolderState.bind(this);
    this.setPermissionState = this.setPermissionState.bind(this);
  }
  

  componentWillMount() {
	 	const cachedFolder = FolderStore.getFolderById();
    const query = queryString.parse(location.search);

	 	FolderStore.addChangeListener(this.onChange);
    
    if(this.create) {
      return
    }
    
	 	if(!cachedFolder) {
      FolderActions.getSingle(query.id);
	 	} else {
      this.setState({
        folder: FolderStore.getFolderById()
      });
	 	}
  }


	onChange() {
    this.setState({
      folder: FolderStore.getFolderById()
    });
	}


	componentWillUnmount() {
		FolderStore.removeChangeListener(this.onChange);
  }


  setFolderState(e) {
    let folderState = this.state.folder;
    let field = e.target.name;
    let value = e.target.value;
    
    folderState[field] = value;
    folderState['dirty'] = true;

    this.setState({
      folder: folderState
    });
  }
  
  
  setPermissionState(e) {
    let folderState = this.state.folder;
    folderState['publicPermission'] = !folderState.publicPermission;
    
    this.setState({
      folder: folderState
    })
  }


  deleteFolder(e) {
    e.preventDefault();
    FolderActions.delete(this.state.folder._id);
    
    this.props.history.push("/folders");
  }


  saveFolder(e) {
    e.preventDefault();

    // create / update logic
    if(this.create) {
      FolderActions.createFolder(this.state.folder);
      this.props.history.push(`/folders`);
    } else {
      // update folder action
      FolderActions.updateFolder(this.state.folder);
      this.props.history.push(`/folders/folder?id=${this.state.folder._id}`);
    }

  }

  
  render() {

    let pageTitle = this.create ? 'Create folder' : 'Manage folder'
    let postBtnName = this.create ? 'Create folder' : 'Update'

    return(
      <div className="container-fluid">
      
        <div className='l-center'>
          <h1>{pageTitle}</h1>
  
          <TextInput
            name="title"
            label="title"
            onChange={this.setFolderState}
            placeholder="Type folder name"
            type="text"
            value={this.state.folder && this.state.folder.title}
          />
          
          <label className="label--checkbox">
            <input type="checkbox" className="checkbox" checked={this.state.folder.publicPermission} onChange={this.setPermissionState} />Make folder public
          </label>
          
          <div className="row">
            <div className="col-sm-4">
              <button className="btn" onClick={this.saveFolder}>{postBtnName}</button>
            </div>
            <div className="col-sm-4">
              <a href="#" onClick={this.deleteFolder}>Delete folder</a>
            </div>
          </div>
        
        </div>
        
      </div>
    )
  }

};

export default ManageFolderPage;
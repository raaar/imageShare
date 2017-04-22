import React, { Component } from 'react';

import FolderActions from '../../actions/folderActions';
import FolderStore from '../../stores/folderStore';
import TextInput from '../common/textInput';

import queryString from 'query-string';


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
  
  /*
  statics: {
    willTransitionFrom: function(transition, component) {
      console.log(component);
      if(component.state.dirty && !confirm('Are you sure you want to leave the page? Your data will be lost')) {
        transition.abort();
      }
    }
  }*/


  componentWillMount() {
    const query = queryString.parse(location.search);

	 	FolderStore.addChangeListener(this.onChange);
	 	
	 	if(query.id) {
      if(!this.state.folder.title) {
        FolderActions.getSingle(query.id);
      } else {
        this.setstate({
          folder: FolderStore.getFolderById()
        });
      }
      
	 	}
	 	
/*
    // component will not re-render when setting state
    var folderId = this.props.params.id;
    
    if(folderId) {

      // if no data is loaded after page refresh, load data from server
      if(!this.state.folder.title) {
        FolderActions.getSingle(this.props.params.id);
      };

      this.setstate({
        folder: folderstore.getfolderbyid()
      });
    }
    */
  }


  componentDidMount() {
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
    //var folderPerm = !this.state.folder.publicPermission;
    let folderState = this.state.folder;
    var field = e.target.name;
    var value = e.target.value;
    
    folderState[field] = value;
    folderState['dirty'] = true;
    //folderState['publicPermission'] =  folderPerm;

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
    FolderActions.delete(this.state.folder.id);
    //this.transitionTo('folders');
  }


  saveFolder(e) {
    e.preventDefault();

    // create / update logic
    if(this.create) {
      FolderActions.createFolder(this.state.folder);
      
    } else {
      // update folder action
      FolderActions.updateFolder(this.state.folder);
    }

    //this.transitionTo('folders');
  }


  _deleteBtn() {
    return (
      <div>
        <a href="#" onClick={this.deleteFolder}>Delete folder</a>
      </div>
    );
  }


  render() {

    let pageTitle = this.create ? 'Create folder' : 'Manage folder'
    let postBtnName = this.create ? 'Create folder' : 'Update'

    return(
      <div className="container-fluid">
      
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
            { this._deleteBtn() }
          </div>
        </div>
        
      </div>
    )
  }

};
/*
            
        <br />
        <div className="row">
          <div className="col-sm-4">
            <button className="btn" onClick={this.saveFolder}>{postBtnName}</button>
          </div>
          <div className="col-sm-4">
            {this.props.params.id && this._deleteBtn() }
          </div>
        </div>

*/

export default ManageFolderPage;
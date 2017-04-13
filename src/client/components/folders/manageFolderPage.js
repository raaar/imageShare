'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var FolderActions = require('../../actions/folderActions');
var FolderStore = require('../../stores/folderStore');
var TextInput = require('../common/textInput');


var manageFolderPage = React.createClass({
  
  mixins: [
    Router.Navigation
  ],


  getInitialState: function() {
    return {
      folder: {
        title: "",
        publicPermission: true
      },
      dirty: false
    }
  },
  
  create: true,

  statics: {
    willTransitionFrom: function(transition, component) {
      console.log(component);
      if(component.state.dirty && !confirm('Are you sure you want to leave the page? Your data will be lost')) {
        transition.abort();
      }
    }
  },


  componentWillMount: function() {

    if(this.props.params.id) {
      // lets the UI know if we are are creating a folder, or modifying one
      this.create = false;
    }

	 	FolderStore.addChangeListener(this._onChange);

    // component will not re-render when setting state
    var folderId = this.props.params.id;
    
    if(folderId) { 

      // if no data is loaded after page refresh, load data from server     
      if(!this.state.folder.title) {
        FolderActions.getSingle(this.props.params.id);
      };

      this.setState({
        folder: FolderStore.getFolderById()
      }); 
    }
  },


  componentDidMount: function() {
  },


	_onChange: function() {
    this.setState({
      folder: FolderStore.getFolderById()
    });
	},



	componentWillUnmount: function() {
		FolderStore.removeChangeListener(this._onChange);
  },


  setFolderState: function(e) {
    this.setState({dirty: true}); // the form has been modified
    var field = e.target.name;
    var value = e.target.value;
    this.state.folder[field] = value;


    var perm = !this.state.folder.publicPermission;
    this.state.folder['publicPermission'] = perm;

    return this.setState({
      folder: this.state.folder 
    });
  },


  deleteFolder: function(e) {
    e.preventDefault();
    FolderActions.delete(this.props.params.id);
    this.transitionTo('folders');
  },


  saveFolder: function(e) {
    e.preventDefault();

    // create / update logic
    if(this.create) {
      FolderActions.createFolder(this.state.folder);
    } else {
      // update folder action
      FolderActions.updateFolder(this.state.folder);
    }

    this.transitionTo('folders');
  },


  _deleteBtn: function() { 
    return (
      <div>
        <a href="#" onClick={this.deleteFolder}>Delete folder</a>
      </div>
    );
  },


  render: function() {

    var pageTitle = this.create ? 'Create folder' : 'Manage folder'
    var postBtnName = this.create ? 'Create folder' : 'Update' 

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
          <input type="checkbox" className="checkbox" checked={this.state.folder.publicPermission} onChange={this.setFolderState} />Make folder public 
        </label>
            
        <br />
        <div className="row">
          <div className="col-sm-4">
            <button className="btn" onClick={this.saveFolder}>{postBtnName}</button>
          </div>
          <div className="col-sm-4">
            {this.props.params.id && this._deleteBtn() }
          </div>
        </div>
      </div>
    )
  }

});


module.exports = manageFolderPage;

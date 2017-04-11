var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var FolderActions = require('../../actions/folderActions');
var FolderStore = require('../../stores/folderStore');
var ImageForm = require('../image/imageForm');

var ImageSingle = React.createClass({

  mixins: [
    Router.Navigation
  ],


  getInitialState: function() {
    return {
      folder: {
        title: ""
      }
    }
  },


  componentWillMount: function() {
		FolderStore.addChangeListener(this._onChange);
  },


  componentDidMount: function() {
    if(this.isMounted()) {
      this.setState({
        folder: FolderActions.getSingle(this.props.params.id)
      }); 
    }
  },


	componentWillUnmount: function() {
		FolderStore.removeChangeListener(this._onChange);
	},


  upload: function(e) {
    e.preventDefault();
  },


	_onChange: function() {
    this.setState({
      folder: FolderStore.getFolderById()
    }); 
	},


  render: function() {

    return (
      <div className="container-fluid">
        <h1>{this.props.params.title}</h1>
        <p>{this.props.params.id}</p>
        <Link className="btn" to="manage-folder" params={this.props.params}>Manage</Link>
        <a href="#" onClick={this.upload}>Upload</a>

            <ImageForm 
              title={this.state.title}
              onChange={this.setImageState}    
              onFileChange={this.handleFile}
              onSave={this.saveImage}
              complete={this.state.complete}
              processing={this.state.processing}
            />        
      </div>
    )
  }
});


module.exports = ImageSingle;

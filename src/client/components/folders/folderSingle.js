var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var FolderActions = require('../../actions/folderActions');
var FolderStore = require('../../stores/folderStore');
var ImageStore = require('../../stores/imageStore');
var ImageForm = require('../image/imageForm');

var ImageUploader = require('../image/imageUploader');
var ImageGridContainer = require('../image/imageGridContainer');


var ImageSingle = React.createClass({


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
      <div>
        <div className="container-fluid">
          <h1>{this.props.params.title}</h1>

          <Link className="btn" to="manage-folder" params={this.props.params}>Manage</Link>

          <ImageUploader folderId={this.props.params.id} />
        </div>

        <ImageGridContainer query={{folderId: this.props.params.id}} gridSize="large" modifiers="grid--folder" />
      </div>
    )
  }
});


module.exports = ImageSingle;

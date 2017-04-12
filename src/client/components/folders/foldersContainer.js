var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var FolderActions = require('../../actions/folderActions');
var FolderStore = require('../../stores/folderStore');
var Folders = require('./folders');

var FoldersContainer = React.createClass({


  getInitialState: function() {
    return {
      folders: []
    }
  },


  componentWillMount: function() {
		FolderStore.addChangeListener(this._onChange);
  },


  componentDidMount: function() {
    FolderActions.loadFolders();

    if(this.isMounted()) {
      this.setState({
        folders: FolderStore.getFolders()
      }); 
    }
  },


	_onChange: function() {
    this.setState({
      folders: FolderStore.getFolders()
    });
	},


	componentWillUnmount: function() {
		FolderStore.removeChangeListener(this._onChange);
  },



  render: function() {
    return (
      <Folders folders={this.state.folders} />
    )
  }

});


module.exports = FoldersContainer;

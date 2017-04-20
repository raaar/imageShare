import React, { Component } from 'react';
//var Router = require('react-router');
//var Link = Router.Link;
import FolderActions from '../../actions/folderActions';
import FolderStore from '../../stores/folderStore';
//var Folders = require('./folders');

class FoldersContainer extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      folders: []
    }

    this.onChange = this.onChange.bind(this);
  }

  /*getInitialState: function() {
    return {
      folders: []
    }
  },
  */


  componentWillMount() {
		FolderStore.addChangeListener(this.onChange);
  }


  componentDidMount() {
    FolderActions.loadFolders();

    //if(this.isMounted()) {
      this.setState({
        folders: FolderStore.getFolders()
      });
    //}
  }
  


	onChange() {
    this.setState({
      folders: FolderStore.getFolders()
    });
	}


	componentWillUnmount() {
		FolderStore.removeChangeListener(this.onChange);
  }



  render() {
    return (
      <div>
        Folders
      </div>
    )
  }

};


/*
<Folders folders={this.state.folders} />
*/

export default FoldersContainer;

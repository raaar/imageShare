import React, { Component } from 'react';
import FolderActions from '../../actions/folderActions';
import FolderStore from '../../stores/folderStore';
import Folders from './folders';

class FoldersContainer extends Component {


  constructor(props, context) {
    super(props, context);
    this.state = {
      folders: FolderStore.getFolders()
    }

    FolderActions.loadFolders();
    
    this.onChange = this.onChange.bind(this);
  }


  componentWillMount() {
		FolderStore.addChangeListener(this.onChange);
  }


  componentDidMount() {
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
        <Folders folders={this.state.folders} />
      </div>
    )
  }

};


export default FoldersContainer;

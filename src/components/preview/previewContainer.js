import React, { Component } from 'react';

import axios from 'axios';
import queryString from 'query-string';

import GridWrapper from '../common/gridWrapper';
import ImageGridContainer from '../image/imageGridContainer';
import Modal from '../modal/modalGalleryContainer';


class PreviewContainer extends Component {
  
  
  constructor(props, context) {
    super(props, context);
    this.state = {
      folder: {
        title: ''
      }
    }
     
    this.query = queryString.parse(this.props.location.search);
  }
  
  
  componentDidMount() {
    
		console.log(this.query.folderId);
    //FolderActions.getSingle(this.query.folderId);
	  // 	const cachedFolder = FolderStore.getFolderById();
    axios.get(`/api/preview/${this.query.folderId}`)
      .then((data) => {
        
        //console.info('folder data: ', data);
        this.setState({
          folder: data.data
        });
        
      })
      .catch((error) => {
        console.log('catching error');
        console.log(error);
        this.props.history.push("/auth");
      });
  }
  
	
  render() {
    
    return (
      <div>
        <GridWrapper>
          <div className='mast'>
            <div className='container-fluid'>
              <h1>{this.state.folder.title}</h1>
            </div>
          </div>
        </GridWrapper>
        { this.state.folder._id &&
          <ImageGridContainer size='large' query={{folderId: this.state.folder._id}} />
        }
        { this.state.folder._id &&
          <Modal />
        }
      </div>
    )
  }
}


export default PreviewContainer;
import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';


function getFolders(item){

  var permissionText = item.publicPermission ? "Public" : "Private";
 
  return(
    <div key={item._id}>
      <Link to={{pathname:"folders/folder", search:`id=${item._id}`}} >
        <div className="col-md-3">
          <div className="folder">
            <div className="folder__title">{item.title}</div>
            <small>{permissionText}</small>
          </div>
        </div>
      </Link>
    </div>
  )
}


class Folders extends Component {

  render() {
    
    const isLoaded = this.props.folders && this.props.folders.length > 0;
    
    return(
      <div className="container-fluid content">
        <div className="row">

          <div className="col-md-3">
            <Link to={'/folders/folder/create'}>
              <div className="folder folder--new">
                Create New
                <div>+</div>
              </div>
            </Link>
          </div>

          { isLoaded && this.props.folders.map(getFolders, this)}

        </div>
      </div>
    )
  }

};


export default Folders;
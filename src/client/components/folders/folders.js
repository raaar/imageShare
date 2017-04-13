var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Folders = React.createClass({


  _getFolders: function(item){
    console.log(item);

    var permissionText = item.publicPermission ? "Public" : "Private";

    return(
      <div key={item._id}>          
        <Link to="folderSingle" params={{id: item._id, title: item.title}}>
          <div className="col-md-3">
            <div className="folder">
              <div className="folder__title">{item.title}</div> 
              <small>{permissionText}</small>
            </div>
          </div>
        </Link>      
      </div>

    )
  },


  render: function() {
    return(
      <div className="container-fluid content">
        <div className="row">

          <div className="col-md-3">
            <Link to="addFolder">
              <div className="folder folder--new">
                Create New 
                <div> +</div>
              </div>
            </Link>
          </div>

          { this.props.folders &&
            this.props.folders.map(this._getFolders, this)}

        </div>
      </div>
    )
  }

});


module.exports = Folders;

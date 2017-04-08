var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var FoldersContainer = React.createClass({

  newFolder: function() {
    
  },


  render: function() {
    return (
      <div className="container-fluid content">
        <div className="row">
          <div className="col-md-3">
            <a href="#" onClick={this.newFolder} >
              <div className="folder">
                Create New 
                <div> +</div>
              </div>
            </a>
          </div>
          <Link to="folderSingle">
          <div className="col-md-3">
            <div className="folder">
              <div className="folder__title">Folder Name</div> 
            </div>
          </div>
          </Link>
        </div>
      </div>
    )
  }

});


module.exports = FoldersContainer;

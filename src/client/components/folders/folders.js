var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Folders = React.createClass({


  _getFolders: function(item){
    return(
      <div key={item._id}>          
        <Link to="folderSingle" params={{id: item._id, title: item.title}}>
          <div className="col-md-3">
            <div className="folder">
              <div className="folder__title">{item.title}</div> 
            </div>
          </div>
        </Link>      
      </div>

    )
  },

  render: function() {
    return(
      <div>
        { this.props.folders &&
          this.props.folders.map(this._getFolders, this)}
      </div>
    )
  }

});


module.exports = Folders;

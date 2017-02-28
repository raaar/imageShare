var React = require('react');
var ImageStore = require('../../stores/imageStore');
var ImageActions = require('../../actions/imageActions');
var Router = require('react-router');
var Link = Router.Link;

var ImageSingle = React.createClass({

  getInitialState: function() {
    return {
     image: {
       title: "",
       author: "",
       image: {
         thumb: "",
         full: "",
       }
     } 
    };
  },

  componentWillMount: function() {
    var imageId = this.props.params.id;
    
    if(imageId) {
      this.setState({image: ImageStore.getImageById(imageId)});
    }
  },
  
  componentDidMount: function() {
    if(this.isMounted()) {
      var imageId = this.props.params.id;
      this.setState({image: ImageStore.getImageById(imageId)});
    }
  },

	// The following are important lines responsible for page refresh when the data changes. Wothout them, the view would not refresh when we delete an item
	componentWillMount: function() {
		ImageStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ImageStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    var imageId = this.props.params.id;
		this.setState({image: ImageStore.getImageById(imageId) });
	},

  deleteImage: function(id, e) {
    e.preventDefault();
    ImageActions.deleteImage(id); 
  },

  render: function() {
    var url = "uploads/" + this.state.image.image.full;
    var authorUrl = "profile/" + this.state.image.author;

    console.info("id: ", this.state.image._id);

    return (
      <div>
        <img className="image" width="100"  src={url} />
        <p>Title: {this.state.image.title}</p>
        <p>By: <Link to="profile" params={{author: this.state.image.author}}>{this.state.image.author}</Link></p>
        <p>Size: {this.state.image.image.size}</p>
			  <a href="#" onClick={this.deleteImage.bind(this, this.state.image._id)}>Delete</a>
      </div>
    )
  }
});

module.exports = ImageSingle;

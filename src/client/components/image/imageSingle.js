var React = require('react');
var ImageStore = require('../../stores/imageStore');
var ImageActions = require('../../actions/imageActions');
var Router = require('react-router');
var Link = Router.Link;
var UserStore = require('../../stores/userStore');

var ImageSingle = React.createClass({

  mixins: [
    Router.Navigation
  ],

  getInitialState: function() {
    return {
     user: {
     },
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
      this.setState({
        image: ImageStore.getImageById(imageId)
      });
    }
  },
  
  componentDidMount: function() {
    var user = UserStore.getUser(); // logged in user
    if(this.isMounted()) {
      var imageId = this.props.params.id;
      this.setState({
              user: user,
              image: ImageStore.getImageById(imageId)}
      );
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
    this.transitionTo('app');
  },

  render: function() {
    var _self = this;
    var url = "uploads/" + this.state.image.image.full;
    var authorUrl = "profile/" + this.state.image.author;

    console.info("id: ", this.state.image._id);
    
    console.info(this.state.user.userName);
    var deleteButton = function() {
      if(_self.state.image.author === _self.state.user.userName) {
        return (
          <div>
			      <a href="#" onClick={_self.deleteImage.bind(_self, _self.state.image._id)}>Delete</a>
          </div>
        )
      }
    } 

    return (
      <div>
        <img className="image" width="100"  src={url} />
        <p>Title: {this.state.image.title}</p>
        <p>By: <Link to="profile" params={{author: this.state.image.author}}>{this.state.image.author}</Link></p>
        <p>Size: {this.state.image.image.size}</p>
        {deleteButton()}
      </div>
    )
  }
});

module.exports = ImageSingle;

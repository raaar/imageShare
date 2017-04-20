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
		ImageStore.addChangeListener(this._onChange);

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


  _deleteButton: function() {
      if(this.state.image.author === this.state.user.userName) {
        return (
          <div>
			      <a href="#" onClick={this.deleteImage(this.state.image._id)}>Delete</a>
          </div>
        )
      }
  },


  render: function() {
    var url = "uploads/images/" + this.state.image.image.full;
    var authorUrl = "profile/" + this.state.image.author;

    return (
      <div>
        <img className="image" width="100"  src={url} />
        <p>Title: {this.state.image.title}</p>
        <p>By: <Link to="profile" params={{author: this.state.image.author}}>{this.state.image.author}</Link></p>
        <p>Size: {this.state.image.image.size}</p>
        {this._deleteButton()}
      </div>
    )
  }
});

module.exports = ImageSingle;

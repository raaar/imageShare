'use strict';

var React = require('react');
var UserStore = require('../../stores/userStore');
var FileInput = require('../common/fileInput');
var UserActions = require('../../actions/userActions');
var ImageActions = require('../../actions/imageActions');
var ImageStore = require('../../stores/imageStore');
var ImageGrid = require('../image/imageGrid');


var UserProfile = React.createClass({

  getInitialState: function() {
    return {
      user: {
        avatar: "http://placehold.it/30x30",
        id: "",
        userName: ""
      },
      images: [
      ],
      own: false,
      userLoaded: false
    };
  },


  componentDidMount: function() {
    var userStore = JSON.parse(sessionStorage.UserStore);
    ImageActions.userImages(userStore.userName);

    if(this.isMounted()) {
      this.setState({
        images: ImageStore.getUserImages(),
        user: UserStore.getUser()
      });
    }
  },


	// The following are important lines responsible for page refresh when the data changes. Wothout them, the view would not refresh when we delete an item
	componentWillMount: function() {
		UserStore.addChangeListener(this._onChange);
		ImageStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		UserStore.removeChangeListener(this._onChange);
		ImageStore.removeChangeListener(this._onChange);
    this.setState({
      userLoaded: false,
    });
	},

	_onChange: function() {
    this.setState({
      user: UserStore.getUser(),
      userLoaded: true,
      images: ImageStore.getUserImages()
    });
	},

  handleFile: function(e) {
    e.preventDefault();

    var _self = this;
    var file = e.target.files[0];
    var reader = new FileReader();
    var formData = new FormData();

    // the 'image' attribute should be the same name as defined by the upload input component,
    // and by the 'upload.single(''') defined in imageRoutes.js
          
    formData.append('image', file);
    formData.append('user', this.state.user);

    reader.onloadend = function(e) {
      _self.setState({
        formData: formData
      });
    }

    reader.readAsDataURL(file);
  },

  saveAvatar: function(e) {
    e.preventDefault();
    UserActions.saveAvatar(this.state.formData);
  },

  logOut: function(data, e) {
    e.preventDefault();

    UserActions.logOut(function(){
      location.href="/";
    });
  },

  render: function() {
    var _self = this;
    var userLoaded = function() {
      if(_self.state.images != undefined && _self.state.images.length > 0) {
        return (
          <div>
            <ImageGrid images={_self.state.images} />
          </div>
        )
      } else {
        return (
          <div>
            Loading
          </div>
        )
      }
    };


    if(this.state.user.avatar === undefined) {
      var avatarLg = "images/placeholder-avatar.png";
    } else {
      var avatarLg = './uploads/avatar/lg-' + this.state.user.avatar;
    }


    return (
      <div>
        <div className="l-split">
          <div className="l-split__sidebar">
            
            <div className="sparrow">
              <div className="sparrow__img">
                <img className="avatar-lg" src={avatarLg} />
                <p>{this.state.user.userName}</p>
                <p><a href="#" onClick={this.logOut.bind(null, this)} >Logout</a></p>
              </div>
            </div>

            <form encType="multipart/form-data">
              <FileInput
                onChange={this.handleFile}
                name="image"
              />

              <input type="submit" className="btn btn-default" value="Submit" onClick={this.saveAvatar} />
            </form>

          </div>
          <div className="l-split__main">
            {userLoaded()} 
          </div>
        </div>



      </div>
    );
  }
});

module.exports = UserProfile

'use strict';

var React = require('react');
var UserStore = require('../../stores/userStore');
var FileInput = require('../common/fileInput');
var UserActions = require('../../actions/userActions');
var ImageGridContainer = require('../image/imageGridContainer');
var $ = require('jquery');
var toastr = require('toastr');
var config = require('../../../../config');


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
      error: ""
    };
  },


  componentDidMount: function() {

    toastr.options = {
      "positionClass": "toast-bottom-right" 
    };


    if(this.isMounted()) {
      this.setState({
        user: UserStore.getUser()
      });
    }
  },


	// The following are important lines responsible for page refresh when the data changes. Wothout them, the view would not refresh when we delete an item
	componentWillMount: function() {
		UserStore.addChangeListener(this._onChange);
	},

        
	componentWillUnmount: function() {
		UserStore.removeChangeListener(this._onChange);
	},


	_onChange: function() {
    this.setState({
      user: UserStore.getUser(),
    });
	},


  handleFile: function(e) {
    e.preventDefault();

    var _self = this;
    var file = e.target.files[0];
    var reader = new FileReader();
    var fileExt;

    if(file.type === 'image/jpeg') {
      fileExt = '.jpeg';
    } else if (file.type === 'image/png' ) {
      fileExt = '.png'; 
    } 

    var fileNameStamp = Math.round(+new Date()/1000);
    var fileN = 'avatar-' + fileNameStamp + fileExt;
    file.id = fileN;

    var newFormData = {
      fileName: fileN,
      user: this.state.user
    };

    reader.onloadend = function(e) {
      _self.setState({
        formData: newFormData,
        file: file 
      });
      
      _self.saveAvatar();
    }

    if(file) {
      reader.readAsDataURL(file);
    }
  },


  avatarUpload: function(e) {
    e.preventDefault();
    $("input[type='file']").trigger('click');
  },


  saveAvatar: function(e) {
    if(e) {
      e.preventDefault();
    };

    UserActions.saveAvatar(this.state.formData, this.state.file, function(err){
      toastr.error(err);
    });

    toastr.warning('Uploading avatar');
  },

       
  logOut: function(data, e) {
    e.preventDefault();

    UserActions.logOut(function(){
      location.href="/";
    });
  },


  render: function() {
    var userData = UserStore.getUser();


    if(this.state.user.avatar === undefined) {
      var avatarLg = "images/placeholder-avatar.png";
    } else {
      var avatarLg = config.thumbMedium + this.state.user.avatar;
    }


    return (
      <div>
        <div className="l-split">
          <div className="l-split__sidebar">
            
            <div className="sparrow">
              <div className="sparrow__img">
                <img className="avatar-lg" src={avatarLg} />
                <div className="sparrow__title">{this.state.user.userName}</div>
                <div className="sparrow__item">
                  <a href="#" className="js-edit-avatar" onClick={this.avatarUpload}>Edit avatar</a>
                  <form className="visually-hidden" encType="multipart/form-data">
                    <FileInput
                      onChange={this.handleFile}
                      name="image"
                    />
                    <input type="submit" className="btn btn-default visually-hidden" value="Submit" onClick={this.saveAvatar} />
                  </form>
                </div>
                <div className="sparrow__item"><a href="#" onClick={this.logOut.bind(null, this)} >Logout</a></div>
              </div>
            </div>

          </div>
          <div className="l-split__main">
            <ImageGridContainer images={this.state.images} query={{author: userData.userName}}  />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserProfile

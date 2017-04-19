
import React, { Component } from 'react';

import AuthStore from '../../stores/authStore';
//var FileInput = require('../common/fileInput');
import AuthActions from '../../actions/authActions';
//var ImageGridContainer = require('../image/imageGridContainer');
var toastr = require('toastr');
var config = require('../../../config');


class UserProfile extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
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

    this.onChange = this.onChange.bind(this);
    this.logOut = this.logOut.bind(this);
  }


  componentDidMount() {

    toastr.options = {
      "positionClass": "toast-bottom-right" 
    };


      this.setState({
        user: AuthStore.getUser()
      });
  }


  componentWillMount() {
    AuthStore.addChangeListener(this.onChange);
  }


  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onChange);
  }


  onChange() {
    this.setState({
      user: AuthStore.getUser(),
    });
  }


  handleFile(e) {
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
  }


  avatarUpload(e) {
    e.preventDefault();
    this.refs.submitAvatar.getDOMNode(this).click();
  }


  saveAvatar(e) {
    if(e) {
      e.preventDefault();
    };

    //UserActions.saveAvatar(this.state.formData, this.state.file, function(err){
    //  toastr.error(err);
    //});

    toastr.warning('Uploading avatar');
  }


  logOut(data, e) {
    //e.preventDefault();
    AuthActions.logout();
  }


  render() {
    var userData = AuthStore.getUser();

/*
    if(this.state.user.avatar === undefined) {
      var avatarLg = "images/placeholder-avatar.png";
    } else {
      var avatarLg = config.thumbMedium + this.state.user.avatar;
    }
*/

    return (
      <div>
        <div className="l-split">
          <div className="l-split__sidebar">

            <div className="sparrow">
              <div className="sparrow__img">
                <img className="avatar-lg" src="" />
                <div className="sparrow__title">{this.state.user && this.state.user.userName}</div>
                <div className="sparrow__item">
                  <a href="#" className="js-edit-avatar" onClick={this.state.user && this.avatarUpload}>Edit avatar</a>
                  fileInput
                    <input type="submit" className="btn btn-default visually-hidden" value="Submit" onClick={this.saveAvatar} />
                </div>
                <div className="sparrow__item"><a href="#" onClick={this.logOut}>Logout</a></div>
              </div>
            </div>

          </div>
          <div className="l-split__main">
            Image Gallery
          </div>
        </div>
      </div>
    );
  }
}


export default UserProfile;

/*
 *


                  <form className="visually-hidden" encType="multipart/form-data">
                    <FileInput
                      onChange={this.handleFile}
                      name="image"
                      ref="submitAvatar"
                    />

 * */

              //<ImageGridContainer query={{author: userData.userName}}  />

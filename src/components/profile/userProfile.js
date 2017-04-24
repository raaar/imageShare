import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AuthStore from '../../stores/authStore';
import FileInput from '../common/fileInput';
import AuthActions from '../../actions/authActions';
import Avatar from '../common/avatar';
import ImageGridContainer from '../image/imageGridContainer';
import Notify from '../common/notify';
import dictionary from '../../../dictionary/dictionary';


class UserProfile extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      user: AuthStore.getUser()
    };

    this.avatarUpload= this.avatarUpload.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.logOut = this.logOut.bind(this);
  }


  componentWillMount() {
    AuthStore.addChangeListener(this.onChange);
  }


  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onChange);
  }


  onChange() {
    this.setState({
      user: AuthStore.getUser()
    });
  }


  handleFile(e) {
    e.preventDefault();

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

    reader.onloadend = (e) => {
      this.setState({
        formData: newFormData,
        file: file
      });

      AuthActions.saveAvatar(this.state.formData, this.state.file);
      Notify.warning(dictionary.client.uploadAvatarInProgress);
    }

    if(file) {
      reader.readAsDataURL(file);
    }
  }


  avatarUpload(e) {
    e.preventDefault();
    ReactDOM.findDOMNode(this.submitAvatar).click();
  }


  logOut(data, e) {
    AuthActions.logout();
  }


  render() {

    return (
      <div>
        <div className="l-split">
          <div className="l-split__sidebar">

            <div className="sparrow">
              <div className="sparrow__img">
                <Avatar src={this.state.user.avatar} size="large" />
                <div className="sparrow__title">{this.state.user.username}</div>
                <div className="sparrow__item">
                  <a href="#" onClick={this.avatarUpload}>Edit avatar</a>
                  <form className="visually-hidden" encType="multipart/form-data">
                    <FileInput
                      onChange={this.handleFile}
                      name="image"
                      ref={ component => this.submitAvatar = component }
                    />
                  </form>
                </div>
                <div className="sparrow__item">
                  <a href="#" onClick={this.logOut}>Logout</a>
                </div>
              </div>
            </div>

          </div>
          <div className="l-split__main">
            <ImageGridContainer query={{author: this.state.user.username}}  />
          </div>
        </div>
      </div>
    );
  }
}


export default UserProfile;
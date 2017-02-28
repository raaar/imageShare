
'use strict';

var React = require('react');
var UserStore = require('../../stores/userStore');
var FileInput = require('../common/fileInput');
var ImageActions = require('../../actions/imageActions');

var UserProfile = React.createClass({

  getInitialState: function() {
    return {
      user: {
      },
      own: false
    };
  },

  componentDidMount: function() {
    var user = UserStore.getUser(); // logged in user

    if(this.isMounted()) {
      this.setState({
        user: UserStore.getUser(),
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
    this.setState({user: UserStore.getUser() });
	},

  handleFile: function(e) {
    e.preventDefault();

    var _self = this;
    var file = e.target.files[0];
    var reader = new FileReader();
    var formData = new FormData();

    // the 'image' attribute should be the same name  as defined by the upload input component, and by the 'upload.single(''') defined in imageRoutes.js
          
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
    ImageActions.saveAvatar(this.state.formData);
    //this.transitionTo('app');
  },

  render: function() {
    return (
      <div>
        <h1>Hi, {this.state.user.userName}</h1>
        <form encType="multipart/form-data">
          <FileInput
            onChange={this.handleFile}
            name="image"
          />
          <input type="submit" className="btn btn-default" value="Submit" onClick={this.saveAvatar} />
        </form>
      </div>
    );
  }
});

module.exports = UserProfile

'use strict';

var React = require('react');
var ImageForm = require('./imageForm');
var ImageActions = require('../../actions/imageActions');
var Router = require('react-router');
var toastr = require('toastr');


toastr.options = {
  "positionClass": "toast-bottom-right" 
};

var ManageImage = React.createClass({
  mixins: [
    Router.Navigation
  ],


  getInitialState: function() {
    return {
      image: {
        title: "",
        file: {
        } 
      },
      errors: {},
      dirty: false,
      complete: false,
      processing: false
    };
  },


  handleFile: function(e) {
    e.preventDefault();

    var reader = new FileReader();
    var _self = this;
    var file = e.target.files[0];
    
    if(file && file.type != 'image/jpeg') {
      toastr.error('File is not an image');
      this.setState({
        complete: false
      });
      return;
    }

    var fileExt;
    if(file.type === 'image/jpeg') {
      fileExt = '.jpeg';
    } else if (file.type === 'image/png' ) {
      fileExt = '.png'; 
    }

    var fileNameStamp = Math.round(+new Date()/1000);
    file.id = fileNameStamp + fileExt;
          
    var newFormData = {
      title: this.state.image.title
    }

    reader.onloadend = function(e) {
      _self.setState({
        formData: newFormData,
        complete: true,
        file: file
      });
    }

    reader.readAsDataURL(file);
  },


  saveImage: function(e) {
    var _self = this;

    if(this.state.complete) {
      var _self = this;

      e.preventDefault();

      this.setState({
        processing: true
      });


      ImageActions.createImage(this.state.formData, this.state.file, this.props.folderId);
    }
  },
        
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="l-center">
            <ImageForm 
              onFileChange={this.handleFile}
              onSave={this.saveImage}
              complete={this.state.complete}
              processing={this.state.processing}
            />        
          </div>
        </div>
      </div>
    )
  }
});

module.exports = ManageImage; 

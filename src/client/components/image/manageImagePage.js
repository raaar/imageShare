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
 /* 
       var image = {
        title: req.body.title,
        author: req.user.username,
        image: {
          id: req.file.filename,
          full: req.file.filename,
          thumb: 'thumb-' + req.file.filename,
          originalname: req.file.originalname,
          size: req.file.size
        }
      };
  */
  getInitialState: function() {
    return {
      image: {
        title: "",
        file: {
        } 
      },
      errors: {},
      dirty: false,
      complete: false
    };
  },

  setImageState: function(e) {
          console.log('setImageState');
   // this.setState({dirty: true}); // the form has been modified
    var field = event.target.name;
    var value = event.target.value;
    this.state.image[field] = value;

    return this.setState({
      image: this.state.image
    });
  },

  handleFile: function(e) {
    e.preventDefault();

    var reader = new FileReader();
    var formData = new FormData();
    var _self = this;
    var file = e.target.files[0];
    

    if(file && file.type != 'image/jpeg') {
      toastr.error('File is not an image');
      this.setState({
        complete: false
      });
      return;
    }

    // the 'image' attribute should be the same name  as defined by the upload input component, and by the 'upload.single(''') defined in imageRoutes.js
          
    formData.append('image', file);
    formData.append('title', this.state.image.title);
    
    reader.onloadend = function(e) {
      _self.setState({
        formData: formData,
        complete: true
      });
    }

    reader.readAsDataURL(file);
  },

  saveImage: function(e) {
    var _self = this;

    if(this.state.complete) {
      e.preventDefault();

      ImageActions.createImage(this.state.formData,
        function(err){
          toastr.error(err);
        }, 
        function() {
          _self.transitionTo('app');
        }
      );
    }
  },
        
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="l-center">
            <ImageForm 
              title={this.state.title}
              onChange={this.setImageState}    
              onFileChange={this.handleFile}
              onSave={this.saveImage}
              complete={this.state.complete}
            />        
          </div>
        </div>
      </div>
    )
  }
});

module.exports = ManageImage; 

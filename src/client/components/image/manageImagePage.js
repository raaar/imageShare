var React = require('react');
var ImageForm = require('./imageForm');
var ImageActions = require('../../actions/imageActions');
var Router = require('react-router');


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
      dirty: false
    };
  },

  setImageState: function(e) {
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

    var _self = this;
    var file = e.target.files[0];
    var reader = new FileReader();
    var formData = new FormData();

    // the 'image' attribute should be the same name  as defined by the upload input component, and by the 'upload.single(''') defined in imageRoutes.js
          
    formData.append('image', file);
    formData.append('title', this.state.image.title);

    reader.onloadend = function(e) {
      _self.setState({
        formData: formData
      });
    }

    reader.readAsDataURL(file);
  },

  saveImage: function(e) {
    e.preventDefault();
    ImageActions.createImage(this.state.formData);
    this.transitionTo('app');
  },
        
  render: function() {

    return (
      <div>
        <ImageForm 
          title={this.state.title}
          onChange={this.setImageState}    
          onFileChange={this.handleFile}
          onSave={this.saveImage}
        />        
      </div>
    )
  }
});

module.exports = ManageImage; 

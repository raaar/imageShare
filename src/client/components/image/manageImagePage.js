var React = require('react');
var ImageForm = require('./imageForm');
var ImageActions = require('../../actions/imageActions');

var ManageImage = React.createClass({
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
        image: ""
      },
      errors: {},
      dirty: false
    };
  },

  componentWillMount: function() {
    // component will not re-render when setting state
    
    var imageId = this.props.params.id;
    
    // if we are editing an existing author, populate with data
    if(imageId) {
    //  this.setState({image: AuthorStore.getAuthorById(authorId)});
    }
  },  

  setImageState: function() {
   // this.setState({dirty: true}); // the form has been modified
    console.info("name: ", event.target.name);
    console.info("value: ", event.target.value);

    var field = event.target.name;
    var value = event.target.value;
    this.state.image[field] = value;

    return this.setState({
      image: this.state.image
    });
    
  },

  saveImage: function() {
    console.info('save image', this.state.image);
    event.preventDefault();
    
          
    //if(!this.authorFormIsValid()) {
    //  return;
    //}
    
    ImageActions.createImage(this.state.image);
    //this.setState({ dirty: false });
    //this.transitionTo('authors');
    //toastr.success('Author added');
  },
        
  render: function() {
    console.log('image form');

    return (
      <div>
        <ImageForm 
          title={this.state.title}
          onChange={this.setImageState}    
          onSave={this.saveImage}
        />        
      </div>
    )
  }
});

module.exports = ManageImage; 

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
      title: "test",
      author: "test",
      image: {
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
    console.log('set image state');
  },

  saveImage: function() {
    console.log('save image')
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
          onChange={this.setImageState}    
          onSave={this.saveImage}
        />        
      </div>
    )
  }
});

module.exports = ManageImage; 

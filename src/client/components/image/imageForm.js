var React = require('react');
var FileInput = require('../common/fileInput');
var Input = require('../common/textInput');

var ImageForm = React.createClass({

  propTypes: {
    onFileChange: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired
  },

  render: function() {

    var isDisabled = '';
    if( !this.props.complete || this.props.processing) {
      isDisabled = 'disabled'; 
    }

    return (
      <div className="uploader form">
        <form encType="multipart/form-data">

          <FileInput 
            name="image"
            type="file"
            onChange={this.props.onFileChange}
          />
        
          <div className="form__submit">
            <button className="btn btn--lg" disabled={isDisabled} onClick={this.props.onSave}>Submit</button>
          </div>
        </form>
      </div>
    )
  }
});


module.exports = ImageForm;

var React = require('react');
var FileInput = require('../common/fileInput');
var Input = require('../common/textInput');

var ImageForm = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired
  },

  render: function() {

    return (
      <div>
       <form>
          <Input
            name="title"
            label="Image Title"
            value={this.props.title}
            placeholder="Image title"
            onChange={this.props.onChange}
						//error={this.props.errors.title}
          />

          <FileInput 
            name="image"
            type="file"
            onChange={this.props.onChange}
            defaultValue={this.props.file}
          />
        
          <input type="submit" className="btn btn-default" value="Submit" onClick={this.props.onSave} />
        </form>
      </div>
    )
  }
});


module.exports = ImageForm;

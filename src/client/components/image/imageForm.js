var React = require('react');
var FileInput = require('../common/fileInput');

var ImageForm = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired
  },

  render: function() {

    return (
      <div>
       <form>
          <FileInput 
            name="image"
            type="file"
            onChange={this.props.onChange}
          />
        
          <input type="submit" className="btn btn-default" value="Submit" onClick={this.props.onSave} />
        </form>
      </div>
    )
  }
});


module.exports = ImageForm;

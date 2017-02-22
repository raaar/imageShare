var React = require('react');
var ImageStore = require('../../stores/imageStore');

var ImageSingle = React.createClass({

  getInitialState: function() {
    return {
     image: {
       image: {
         thumb: "",
         full: ""
       }
     } 
    };
  },

  componentWillMount: function() {
    var imageId = this.props.params.id;
    
    if(imageId) {
      this.setState({image: ImageStore.getImageById(imageId)});
    }
  },
  
  componentDidMount: function() {
    if(this.isMounted()) {
      var imageId = this.props.params.id;
      this.setState({image: ImageStore.getImageById(imageId)});
    }
  },

	// The following are important lines responsible for page refresh when the data changes. Wothout them, the view would not refresh when we delete an item
	componentWillMount: function() {
		ImageStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ImageStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    var imageId = this.props.params.id;
		this.setState({image: ImageStore.getImageById(imageId) });
	},

  render: function() {
    var url = "uploads/" + this.state.image.image.full;

    return (
      <div>
        <img className="image" src={url} />
      </div>
    )
  }
});

module.exports = ImageSingle;

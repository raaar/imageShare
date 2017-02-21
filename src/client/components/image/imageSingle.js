var React = require('react');
var ImageStore = require('../../stores/imageStore');

var ImageSingle = React.createClass({

  getInitialState: function() {
    return {
     image: []
    };
  },

  componentWillMount: function() {
    var imageId = this.props.params.id;

    console.info('image single: ', imageId);
  },
  
  componentDidMount: function() {
    if(this.isMounted()) {
      // this.setState({ authors: AuthorApi.getAllAuthors() });
			//console.info('authorPage comp did mount: ', ImageStore );
      //this.setState({images: ImageStore.getAllImages() });

      //console.info('homepage images data: ', this.state.images);
    }
  },

	// The following are important lines responsible for page refresh when the data changes. Wothout them, the view would not refresh when we delete an item
	componentWillMount: function() {
		//ImageStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		//ImageStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		//this.setState({images: ImageStore.getAllImages() });
    //console.info('on change ', this.state.images );
	},

  render: function() {
    return (
      <div>
        Single Image      
        -----
        {this.props.params.id}
      </div>
    )
  }
});

module.exports = ImageSingle;

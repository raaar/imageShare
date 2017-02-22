'use strict';

var React = require('react');
var ProfileStore = require('../../stores/profileStore');

var Profile = React.createClass({

  getInitialState: function() {
    return {
     profile: []
    };
  },

  componentDidMount: function() {
    var author = this.props.params.author;
    if(this.isMounted()) {
      this.setState({profile: ProfileStore.getProfile(author) });
			//console.info('authorPage comp did mount: ', ImageStore );
      //this.setState({images: ImageStore.getAllImages() });

//      console.info('homepage images data: ', this.state.images);
    }
  },

	// The following are important lines responsible for page refresh when the data changes. Wothout them, the view would not refresh when we delete an item
	componentWillMount: function() {
		ProfileStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ProfileStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    this.setState({profile: ProfileStore.getProfile(author) });
    // console.info('on change ', this.state.images );
	},

  render: function() {
    return (
        <div>
          <h1>Hi {this.state.profile}</h1>
          <p>Profile info</p>  
        </div>
      );
  }
});

module.exports = Profile;

'use strict';

var React = require('react');

var Profile = React.createClass({

  getInitialState: function() {
    return {
     profile: []
    };
  },

  componentDidMount: function() {
    if(this.isMounted()) {
      // this.setState({ authors: AuthorApi.getAllAuthors() });
			//console.info('authorPage comp did mount: ', ImageStore );
      //this.setState({images: ImageStore.getAllImages() });

      console.info('homepage images data: ', this.state.images);
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
		// this.setState({images: ImageStore.getAllImages() });
    // console.info('on change ', this.state.images );
	},
  render: function() {
    return (
        <div>
          <h1>Profile</h1>
          
          <p>
            <ul>
              <li>App</li>
              <li>App</li>
              <li>App</li>
              <li>App</li>
              <li>App</li>
              <li>App</li>
            </ul>
          </p>
        </div>
      );
  }
});

module.exports = Profile;

'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ImageStore = require('../stores/imageStore');

var Home = React.createClass({
  
  getInitialState: function() {
    return {
     images: []
    };
  },

  componentDidMount: function() {
    if(this.isMounted()) {
      // this.setState({ authors: AuthorApi.getAllAuthors() });
			//console.info('authorPage comp did mount: ', ImageStore );
      this.setState({images: ImageStore.getAllImages() });

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
		this.setState({images: ImageStore.getAllImages() });
    console.info('on change ', this.state.images );
	},

  render: function() {
    return (
      <div className="jumbotron">
        <h1>administration</h1>
        <p>We are using React & Flux</p>
        ---
        {this.state.images}
      </div>
      );
  }
});

module.exports = Home;

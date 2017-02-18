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

  componentWillMount: function() {
  },

  componentDidMount: function() {
    if(this.isMounted()) {
      // this.setState({ authors: AuthorApi.getAllAuthors() });
			//console.info('authorPage comp did mount: ', ImageStore );
      this.setState({images: ImageStore.getAllImages() });

      console.info('homepage images data: ', this.state.images);
    }
  },

  render: function() {
    return (
      <div className="jumbotron">
        <h1>Pluralsight administration</h1>
        <p>We are using React & Flux</p>
        ---
        {this.state.images}
      </div>
      );
  }
});

module.exports = Home;

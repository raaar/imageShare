'use strict';

var React = require('react');
var UserStore = require('../../stores/userStore');
var Router = require('react-router');
var ImageGridContainer = require('../image/imageGridContainer');


var Profile = React.createClass({

  mixins: [
    Router.Navigation
  ],


  getInitialState: function() {
    return {
      profile: {}
    };
  },
        

  componentDidMount: function() {
    var author = this.props.params.author;
    var user = UserStore.getUser(); // logged in user

    if(this.isMounted()) {
      if(user.userName === author) {
        this.transitionTo('my-profile')
      }
    }       
  },


  render: function() {

    return (
      <div>
        <div className="mast">
          <div className="container-fluid">
            <h3>Images by: {this.props.params.author}</h3> 
          </div>
        </div>
        <ImageGridContainer query={{author: this.props.params.author}} />
      </div>
    );
  }
});


module.exports = Profile;

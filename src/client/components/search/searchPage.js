var React = require('react');
var Router = require('react-router');
var SearchActions = require('../../actions/searchActions');
var SearchStore = require('../../stores/searchStore');
var SearchImageStore = require('../../stores/searchStoreImages');
var ImageActions = require('../../actions/imageActions');
var ImageStore = require('../../stores/imageStore');
var ImageGridContainer = require('../image/imageGridContainer');
var Api = require('../../api/imagesApi');

var Search = React.createClass({

  mixins: [
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      searchQuery: "",
      images: []
    } 
  },

  componentDidMount: function() {
    if(this.isMounted()) {
      this.setState({
        searchQuery: SearchStore.getQuery()
      })
    }
  },
  

	componentWillMount: function() {
		SearchStore.addChangeListener(this._onChange);
		ImageStore.addChangeListener(this._onChange);
	},


	componentWillUnmount: function() {
		SearchStore.removeChangeListener(this._onChange);
		ImageStore.removeChangeListener(this._onChange);
	},


	_onChange: function() {
    this.setState({
      searchQuery: ImageStore.getImageQuery()
    });
	},
  

  render: function() {
    var txt = this.state.searchQuery ?  "No results found" : "Type a search term"

    return (
      <div>
        <div className="mast">
          <div className="container-fluid">
            <h3>{txt}</h3>
            <p>{this.state.searchQuery}</p>
          </div>
        </div>

        {this.state.searchQuery &&
          <ImageGridContainer query={this.state.searchQuery} />
        }
      </div>
    );
  }
});

module.exports = Search;

var React = require('react');
var Router = require('react-router');
var SearchActions = require('../../actions/searchActions');
var SearchStore = require('../../stores/searchStore');
var SearchImageStore = require('../../stores/searchStoreImages');
var ImageActions = require('../../actions/imageActions');
var ImageStore = require('../../stores/imageStore');
var ImageGrid = require('../image/imageGrid');
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
	},

	componentWillUnmount: function() {
		SearchStore.removeChangeListener(this._onChange);
	},


	_onChange: function() {
    this.setState({
      searchQuery: SearchStore.getQuery(),
      images: SearchStore.getResults()
    });
	},
  

  searchResults: function() {
    if(this.state.images !== undefined) {
      return (
        <div>
          <ImageGrid images={this.state.images} />
        </div>
      );
    }
  },

  searchText: function() {
    var st = this.state;

    if(!st.searchQuery) {
      return (
        <div>
          <h2>Type a search term</h2>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Searching for {st.searchQuery}</h2>
        </div>
      )
    }
  },

  render: function() {
    return (
      <div>
        {this.searchText()}
        {this.searchResults()} 
      </div>
    );
  }
});

module.exports = Search;

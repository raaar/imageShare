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
      query: "",
      images: []
    } 
  },

  componentDidMount: function() {
    _query = JSON.parse(sessionStorage.SearchQuery);
    SearchActions.search(_query);

    if(this.isMounted()) {
      this.setState({
        searchQuery: SearchStore.getQuery(),
        images: SearchActions.search(_query)
      })
    }
  },
  
  componentWillReceiveProps: function(nextProps) {
    console.log('will receive props');
    this.setState({
      // set something 
    });
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
    }, function(){
//      _query = JSON.parse(sessionStorage.SearchQuery);
//      SearchActions.search(_query)
    });

          //setState(nextState, callback)
   /* var _self = this;

    var queryState = new Promise(function(resolve, reject){
      _self.setState({
        searchQuery: SearchStore.getQuery()
      });

      resolve("success");
    });

 
    queryState.then(function(successMessage){
      console.log('then');
      if(_self.receivedQuery === true) {
        _self.setState({
          images: SearchActions.search(_self.state.searchQuery)
       });
      }
    });
    */
	},
  

  searchResults: function() {
    console.log(this.state.images);
    if(this.state.images !== undefined) {
      return (
        <div>
          <ImageGrid images={this.state.images} />
          {this.state.images}
        </div>
      );
    }
  },


  render: function() {
    return (
      <div>
        <h2>Searching for: {this.state.searchQuery}</h2>
        {this.searchResults()} 
      </div>
    );
  }
});

module.exports = Search;

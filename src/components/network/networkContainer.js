import React, { Component } from 'react';
import NetworkItem from './networkItem';
import AuthorStore from '../../stores/authorStore';
import AuthorActions from '../../actions/authorActions';
import GridWrapper from '../common/gridWrapper';


class Network extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      authors: []
    };

    this.onChange = this.onChange.bind(this);
  }


  componentWillMount() {
    AuthorStore.addChangeListener(this.onChange);
  }


  componentDidMount() {
    let getData = AuthorStore.getAll().length > 0 ? AuthorStore.getAll() : AuthorActions.getAll();

    this.setState({
      authors: getData
    });
  }


  componentWillUnmount() {
    AuthorStore.removeChangeListener(this.onChange);
  }



  onChange() {
    this.setState({authors: AuthorStore.getAll()});
  }


  render() {

    let networkItems;

    if(this.state.authors) {
      networkItems = this.state.authors.map((item) =>
        <NetworkItem
          key={item._id}
          item={item}
        />
      );
    }

    return(
      <GridWrapper>
        <div className='media-grid'>
          {networkItems}
        </div>
      </GridWrapper>
    )
  }
}

export default Network;

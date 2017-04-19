import React, { Component } from 'react';

class GridWrapper extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {this.props.children}
        </div>
      </div>
    )
  }
};


export default GridWrapper;

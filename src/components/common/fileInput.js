import React, { Component } from 'react';
import PropTypes from 'prop-types';


class FileInput extends Component {
  render() {
    return (
      <input
        type="file"
        name={this.props.name}
        onChange={this.props.onChange}
      />
    )
  }
};


FileInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}


export default FileInput;

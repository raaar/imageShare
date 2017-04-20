import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileInput from '../common/fileInput';

class UploadPage extends Component {


  render() {

    var isDisabled = '';
    if( !this.props.complete || this.props.processing) {
      isDisabled = 'disabled';
    }

    return (
      <div className="uploader form">
        <form encType="multipart/form-data">

          <FileInput
            name="image"
            type="file"
            onChange={this.props.onChange}
          />
        
          <div className="form__submit">
            <button className="btn btn--lg" disabled={isDisabled} onClick={this.props.onSave}>Submit</button>
          </div>
        </form>
      </div>
    )
  }
};

UploadPage.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

export default UploadPage;
import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Input extends Component {
  
       
  render() {
    var wrapperClass = "form-group";
    
    /* // TODO: add error handling
    if(this.props.error && this.props.error.length > 0) {
      wrapperClass += " " + "hasError";
    }
    */
    
    
    return (
        <div className={wrapperClass}>
            <div className="field">
              <label htmlFor={this.props.name}>{this.props.label}</label>
            </div>
            <input type="text"
                name={this.props.name}
                className="form-control"
                placeholder={this.props.placeholder}
                ref={this.props.name}
                onChange={this.props.onChange}
                value={this.props.value}
            />
            <div className="input">{this.props.error}</div>
        </div>
    );
  }
}


Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string
}

export default Input;

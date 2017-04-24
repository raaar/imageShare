import React, { Component } from 'react';

class ModalDialog extends Component {
  
  render() {
    
    const dialogVisible = this.props.visible ? 'is-visible' : '';
    const dialogClass = `dialog ${dialogVisible}`;
    
    return (
      <div className={dialogClass}>
        {this.props.chieldren}
      </div>
    )
  }
}

export default ModalDialog;
import React, { Component } from 'react';

class ModalDialog extends Component {
  
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      visible: this.props.visible
    };
    
    
    this.closeDialog = this.closeDialog.bind(this);
  }
  
  
  closeDialog() {
    this.setState({
      visible: false
    });
  }
  
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible
    });
  }
  
  
  render() {
    const dialogVisible = this.state.visible ? 'is-visible' : '';
    const dialogClass = `dialog ${dialogVisible}`;
    
    return (
      <div className={dialogClass}>
        <div className='dialog__inner'>
          {this.props.children}
        </div>
        <div className='dialog__overlay' onClick={this.closeDialog}></div>
      </div>
    )
  }
}

export default ModalDialog;
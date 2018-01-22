import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';

class ErrorModal extends Component {
  
  render() {
    const message = Array.isArray(this.props.message) ? this.props.message.join('<br />') : this.props.message;
    return (
      <Modal
        closeIcon 
        open={this.props.isOpen} 
        size='small' 
        closeOnEscape={true} 
        closeOnRootNodeClick={true} 
        onClose={this.props.closeModal}
      >
        <Modal.Content style={{ margin: '10px 0', textAlign: 'center' }}>
          {this.props.message}
        </Modal.Content>
        <Modal.Actions>
          <div className='center'>
            <Button positive onClick={() => {this.props.closeModal()}}>OK</Button>
          </div>
        </ Modal.Actions >
      </ Modal >
    );
  }
};

ErrorModal.propTypes = {
  isOpen: PropTypes.bool,
  message: PropTypes.any,
  closeModal: PropTypes.func,
};

ErrorModal.defaultProps = {
  message: 'エラーが発生しました。',
};

export default ErrorModal;

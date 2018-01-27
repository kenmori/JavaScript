import React, { Component } from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';

class ErrorModal extends Component {
  getErrorMessages(messages) {
    return messages.toArray().map((message) => (
      <p>{message}</p>
    ))
  }
  render() {
    let message = this.props.message;
    if (List.isList(message)) {
      message = this.getErrorMessages(message)
    }
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
          {message}
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

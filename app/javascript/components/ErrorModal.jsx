import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';

class ErrorModal extends Component {
  
  render() {

    return (
      <Modal open={this.props.isOpen} size='small'>
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
  message: PropTypes.string,
  closeModal: PropTypes.func,
};

export default ErrorModal;

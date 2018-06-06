import React, { PureComponent } from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Button, Modal } from 'semantic-ui-react';

class ErrorModal extends PureComponent {
  getErrorMessages(messages) {
    return (
      <ul>
        {messages.map((message, index) => <li key={index}>{message}</li>)}
      </ul>
    )
  }

  handleClose = () => {
    this.props.onCloseBefore();
    this.props.closeModal();
    this.props.onClose();
  }

  render() {
    let message = this.props.message;
    if (List.isList(message)) {
      message = this.getErrorMessages(message)
    } else if (message.includes(', ')) {
      message = this.getErrorMessages(message.split(', '))
    }
    return (
      <Modal
        open={this.props.isOpen} 
        size='small' 
        closeOnEscape={false}
        closeOnDimmerClick={false}
        onClose={this.handleClose}
      >
        <Modal.Content style={{ margin: '10px 0' }}>
          {message}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.handleClose}>OK</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

ErrorModal.propTypes = {
  // container
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, ImmutablePropTypes.list]),
  onClose: PropTypes.func,
  onCloseBefore: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  // component
};

ErrorModal.defaultProps = {
  message: 'エラーが発生しました',
  onClose: () => {},
  onCloseBefore: () => {},
};

export default ErrorModal;

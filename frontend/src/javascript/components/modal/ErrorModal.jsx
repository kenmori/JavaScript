import React, { PureComponent } from "react";
import { List } from "immutable";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Button, Modal } from "semantic-ui-react";

class ErrorModal extends PureComponent {
  getErrorMessage(messages) {
    if (messages.size === 1) {
      return messages.first();
    }
    return (
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    );
  }

  handleClose = () => {
    this.props.onCloseBefore();
    this.props.closeModal();
    this.props.onClose();
  };

  render() {
    const { isOpen, message } = this.props;
    return (
      <Modal
        open={isOpen}
        size="small"
        closeOnEscape={false}
        closeOnDimmerClick={false}
        onClose={this.handleClose}>
        <Modal.Content>
          {this.getErrorMessage(
            List.isList(message) ? message : List(message.split(", ")),
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.handleClose}>
            OK
          </Button>
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
  message: "エラーが発生しました",
  onClose: () => {},
  onCloseBefore: () => {},
};

export default ErrorModal;

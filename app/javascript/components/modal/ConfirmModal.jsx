import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Confirm } from 'semantic-ui-react';

class ConfirmModal extends Component {
  handleCancel() {
    this.props.closeModal();
    this.props.onCancel();
  }
  handleConfirm() {
    this.props.closeModal();
    this.props.onConfirm();
  }
  
  render() {
    return (
      <Confirm
        open={this.props.isOpen}
        content={this.props.content}
        onCancel={this.handleCancel.bind(this)}
        onConfirm={this.handleConfirm.bind(this)}
        cancelButton='キャンセル'
      />
    )
  }
}

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool,
  content: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  closeModal: PropTypes.func,
};

ConfirmModal.defaultProps = {
  onCancel: () => {},
  onConfirm: () => {},
};

export default ConfirmModal;

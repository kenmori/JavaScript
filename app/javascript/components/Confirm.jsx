import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Confirm } from 'semantic-ui-react';

class ConfirmModal extends Component {
  handleCancel() {
    this.props.close();
    this.props.onCancel();
  }
  handleConfirm() {
    this.props.close();
    this.props.onConfirm();
  }
  
  render() {
    return (
      <Confirm
        open={this.props.open}
        content={this.props.content}
        onCancel={this.handleCancel.bind(this)}
        onConfirm={this.handleConfirm.bind(this)}
      />
    )
  }
}

ConfirmModal.propTypes = {
  open: PropTypes.bool,
  content: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  close: PropTypes.func,
};

export default ConfirmModal;

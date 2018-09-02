import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Confirm } from 'semantic-ui-react'

class ConfirmModal extends PureComponent {
  handleCancel = () => {
    this.props.closeModal()
    this.props.onCancel()
  }
  handleConfirm = () => {
    this.props.closeModal()
    this.props.onConfirm()
  }
  
  render() {
    return (
      <Confirm
        open={this.props.isOpen}
        content={this.props.content}
        onCancel={this.handleCancel}
        onConfirm={this.handleConfirm}
        cancelButton='キャンセル'
        closeOnEscape={false}
        closeOnDimmerClick={false}
      />
    )
  }
}

ConfirmModal.propTypes = {
  // container
  isOpen: PropTypes.bool.isRequired,
  content: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  // component
}

ConfirmModal.defaultProps = {
  onCancel: () => {},
  onConfirm: () => {},
}

export default ConfirmModal

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'semantic-ui-react'

class OptionModal extends PureComponent {

  render() {
    const { isOpen, closeModal } = this.props
    return (
      <Modal open={isOpen} size="small" onClose={closeModal}>
        <Modal.Content>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal}>キャンセル</Button>
          <Button primary onClick={closeModal}>OK</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

OptionModal.propTypes = {
  // container
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  // component
}

export default OptionModal

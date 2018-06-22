import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, List, Checkbox, Header } from 'semantic-ui-react'

class OptionModal extends PureComponent {

  constructor() {
    super()
    this.state = {
      showMyChildObjectives: false,
      showMyKeyResults: false,
    }
  }

  render() {
    const { isOpen, closeModal } = this.props
    const { showMyChildObjectives, showMyKeyResults } = this.state
    return (
      <Modal closeIcon open={isOpen} size="small" onClose={closeModal}>
        <Modal.Content>
          <Header as='h3'>Objective</Header>
          <List relaxed>
            <List.Item>
              <Checkbox
                label='自分の Key Result に紐付く下位 Objective を表示する'
                checked={showMyChildObjectives}
                onChange={(e, { checked }) => this.setState({ showMyChildObjectives: checked })}
              />
            </List.Item>
          </List>

          <Header as='h3'>Key Result</Header>
          <List relaxed>
            <List.Item>
              <Checkbox
                label='自分の Objective に紐付く Key Result を表示する'
                checked={showMyKeyResults}
                onChange={(e, { checked }) => this.setState({ showMyKeyResults: checked })}
              />
            </List.Item>
          </List>
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

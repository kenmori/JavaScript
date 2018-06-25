import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Button, Modal, List, Checkbox, Header } from 'semantic-ui-react'

class OptionModal extends PureComponent {

  constructor() {
    super()
    this.state = {
      showMyChildObjectives: false,
      showMyKeyResults: false,
      showMembersKeyResults: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.setState({
        showMyChildObjectives: nextProps.userSetting.get('showMyChildObjectives'),
        showMyKeyResults: nextProps.userSetting.get('showMyKeyResults'),
        showMembersKeyResults: nextProps.userSetting.get('showMembersKeyResults'),
      })
    }
  }

  update = () => {
    const { userSetting } = this.props
    const { showMyChildObjectives, showMyKeyResults, showMembersKeyResults } = this.state
    const isDirty = userSetting.get('showMyChildObjectives') !== showMyChildObjectives
      || userSetting.get('showMyKeyResults') !== this.state.showMyKeyResults
      || userSetting.get('showMembersKeyResults') !== this.state.showMembersKeyResults
    if (isDirty) {
      this.props.updateUserSetting({ showMyChildObjectives, showMyKeyResults, showMembersKeyResults })
    } else {
      this.props.closeModal()
    }
  }

  render() {
    const { isOpen, closeModal } = this.props
    const { showMyChildObjectives, showMyKeyResults, showMembersKeyResults } = this.state
    return (
      <Modal closeIcon open={isOpen} size="small" onClose={closeModal}>
        <Modal.Content>
          <Header as='h3'>Objective</Header>
          <List relaxed>
            <List.Item>
              <Checkbox
                label='自分の Objective に紐付く下位 Objective を表示する'
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
            <List.Item>
              <Checkbox
                label='自分が関係者になっている Key Result を表示する'
                checked={showMembersKeyResults}
                onChange={(e, { checked }) => this.setState({ showMembersKeyResults: checked })}
              />
            </List.Item>
          </List>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal}>キャンセル</Button>
          <Button primary onClick={this.update}>OK</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

OptionModal.propTypes = {
  // container
  isOpen: PropTypes.bool.isRequired,
  userSetting: ImmutablePropTypes.map.isRequired,
  updateUserSetting: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  // component
}

export default OptionModal

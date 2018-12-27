import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Button, Modal, List, Checkbox, Header } from 'semantic-ui-react'

class OptionModal extends PureComponent {
  constructor() {
    super()
    this.state = {
      showChildObjectives: false,
      showObjectiveKeyResults: false,
      showMemberKeyResults: false,
      showDisabledOkrs: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.setState({
        showChildObjectives: nextProps.userSetting.get('showChildObjectives'),
        showObjectiveKeyResults: nextProps.userSetting.get(
          'showObjectiveKeyResults'
        ),
        showMemberKeyResults: nextProps.userSetting.get('showMemberKeyResults'),
        showDisabledOkrs: nextProps.userSetting.get('showDisabledOkrs')
      })
    }
  }

  update = () => {
    const { userSetting } = this.props
    const {
      showChildObjectives,
      showObjectiveKeyResults,
      showMemberKeyResults,
      showDisabledOkrs
    } = this.state
    const isDirty =
      userSetting.get('showChildObjectives') !== showChildObjectives ||
      userSetting.get('showObjectiveKeyResults') !== showObjectiveKeyResults ||
      userSetting.get('showMemberKeyResults') !== showMemberKeyResults ||
      userSetting.get('showDisabledOkrs') !== showDisabledOkrs
    if (isDirty) {
      this.props.updateUserSetting({
        showChildObjectives,
        showObjectiveKeyResults,
        showMemberKeyResults,
        showDisabledOkrs
      })
    } else {
      this.props.closeModal()
    }
  }

  render() {
    const { isOpen, closeModal } = this.props
    const {
      showChildObjectives,
      showObjectiveKeyResults,
      showMemberKeyResults,
      showDisabledOkrs
    } = this.state
    return (
      <Modal closeIcon open={isOpen} size="small" onClose={closeModal}>
        <Modal.Content>
          <Header as="h4">全般</Header>
          <List relaxed>
            <List.Item>
              <Checkbox
                label="無効な OKR (Objective, Key Result) を表示する"
                checked={showDisabledOkrs}
                onChange={(e, { checked }) =>
                  this.setState({ showDisabledOkrs: checked })
                }
              />
            </List.Item>
          </List>

          <Header as="h4">Objective 一覧</Header>
          <List relaxed>
            <List.Item>
              <Checkbox
                label="自分の Objective に紐付く下位 Objective を表示する"
                checked={showChildObjectives}
                onChange={(e, { checked }) =>
                  this.setState({ showChildObjectives: checked })
                }
              />
            </List.Item>
          </List>

          <Header as="h4">Key Result 一覧</Header>
          <List relaxed>
            <List.Item>
              <Checkbox
                label="自分の Objective に紐付く Key Result を表示する"
                checked={showObjectiveKeyResults}
                onChange={(e, { checked }) =>
                  this.setState({ showObjectiveKeyResults: checked })
                }
              />
            </List.Item>
            <List.Item>
              <Checkbox
                label="自分が関係者になっている Key Result を表示する"
                checked={showMemberKeyResults}
                onChange={(e, { checked }) =>
                  this.setState({ showMemberKeyResults: checked })
                }
              />
            </List.Item>
          </List>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal}>キャンセル</Button>
          <Button primary onClick={this.update}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

OptionModal.propTypes = {
  // container
  isOpen: PropTypes.bool.isRequired,
  userSetting: ImmutablePropTypes.map,
  updateUserSetting: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
  // component
}

export default OptionModal

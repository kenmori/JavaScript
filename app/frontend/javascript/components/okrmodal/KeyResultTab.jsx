import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Tab, Menu, Label } from 'semantic-ui-react'
import KeyResultPane from '../../containers/KeyResultPane'
import InfoPane from '../../containers/InfoPane'

class KeyResultTab extends PureComponent {
  constructor() {
    super()
    this.state = { activeIndex: 0 }
  }

  updateKeyResult = values => {
    this.props.updateKeyResult({
      id: this.props.keyResult.get('id'),
      ...values
    })
  }

  handleTabChange = (e, { activeIndex }) => {
    const { isDirty, confirm } = this.props
    const { activeIndex: currentIndex } = this.state
    if (activeIndex !== currentIndex && isDirty) {
      confirm({
        content: '編集中の内容を破棄します。よろしいですか？',
        onConfirm: () => {
          this.setState({ activeIndex })
          this.props.setDirty(false)
        }
      })
    } else {
      this.setState({ activeIndex })
    }
  }

  render() {
    const { setDirty } = this.props
    const { activeIndex } = this.state
    const dummyLabel = <Label className="zero-width">&nbsp;</Label> // Label 付きタブと高さを合わせるためのダミー Label

    return (
      <Tab
        panes={[
          {
            menuItem: (
              <Menu.Item key="progress">
                進捗
                {dummyLabel}
              </Menu.Item>
            ),
            render: () => (
              <Tab.Pane>
                <KeyResultPane
                  {...this.props}
                  updateKeyResult={this.updateKeyResult}
                  setDirty={setDirty}
                />
              </Tab.Pane>
            )
          },
          {
            menuItem: (
              <Menu.Item key="info">
                情報
                {dummyLabel}
              </Menu.Item>
            ),
            render: () => (
              <Tab.Pane>
                <InfoPane
                  okr={this.props.keyResult}
                  keyResult={this.props.keyResult}
                  candidates={this.props.objectiveCandidates}
                  isObjectiveOwner={this.props.isObjectiveOwner}
                  isFetchedCandidates={this.props.isFetchedObjectiveCandidates}
                  updateOkr={this.updateKeyResult}
                  users={this.props.users}
                  updateKeyResult={this.updateKeyResult}
                  openObjectiveModal={this.props.openObjectiveModal}
                  confirm={this.props.confirm}
                  disableKeyResult={this.props.disableKeyResult}
                  removeKeyResult={this.props.removeKeyResult}
                />
              </Tab.Pane>
            )
          }
        ]}
        activeIndex={activeIndex}
        onTabChange={this.handleTabChange}
      />
    )
  }
}

KeyResultTab.propTypes = {
  // container
  // component
  keyResult: ImmutablePropTypes.map.isRequired,
  objectiveCandidates: ImmutablePropTypes.list.isRequired,
  users: ImmutablePropTypes.list.isRequired,
  loginUserId: PropTypes.number.isRequired,
  isObjectiveOwner: PropTypes.bool.isRequired,
  isFetchedObjectiveCandidates: PropTypes.bool.isRequired,
  isDirty: PropTypes.bool.isRequired,
  updateKeyResult: PropTypes.func.isRequired,
  removeKeyResult: PropTypes.func.isRequired,
  openObjectiveModal: PropTypes.func.isRequired,
  setDirty: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  keyResultCommentLabels: ImmutablePropTypes.list.isRequired
}

export default KeyResultTab

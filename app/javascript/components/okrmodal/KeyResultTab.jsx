import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Tab, Menu, Label } from 'semantic-ui-react'
import KeyResultPane from '../../containers/KeyResultPane'
import LinkPane from './LinkPane'
import CommentPane from './CommentPane'

class KeyResultTab extends PureComponent {

  constructor() {
    super()
    this.state = { activeIndex: 0 }
  }

  updateKeyResult = values => {
    this.props.updateKeyResult({ id: this.props.keyResult.get('id'), ...values })
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
        },
      })
    } else {
      this.setState({ activeIndex })
    }
  }

  render() {
    const { setDirty } = this.props
    const { activeIndex } = this.state
    const dummyLabel = <Label className='zero-width'>&nbsp;</Label> // Label 付きタブと高さを合わせるためのダミー Label
    const comments = this.props.keyResult.get('comments')
    return (
      <Tab panes={[
        {
          menuItem: <Menu.Item key='keyResult'>Key Result{dummyLabel}</Menu.Item>,
          render: () => <Tab.Pane>
            <KeyResultPane {...this.props} updateKeyResult={this.updateKeyResult} />
          </Tab.Pane>
        },
        {
          menuItem: <Menu.Item key='links'>紐付き{dummyLabel}</Menu.Item>,
          render: () => <Tab.Pane>
            <LinkPane
              okr={this.props.keyResult}
              candidates={this.props.objectiveCandidates}
              isObjective={false}
              isObjectiveOwner={this.props.isObjectiveOwner}
              isFetchedCandidates={this.props.isFetchedObjectiveCandidates}
              updateOkr={this.updateKeyResult}
            />
          </Tab.Pane>
        },
        {
          menuItem: <Menu.Item key='comments'>コメント<Label>{comments ? comments.size : 0}</Label></Menu.Item>,
          render: () => <Tab.Pane loading={!comments}>
            <CommentPane {...this.props} updateKeyResult={this.updateKeyResult} setDirty={setDirty} />
          </Tab.Pane>
        },
      ]} activeIndex={activeIndex} onTabChange={this.handleTabChange} />
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
}

export default KeyResultTab

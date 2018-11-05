import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Form, Divider } from 'semantic-ui-react'
import OkrSelect from '../form/OkrSelect'
import OkrList from '../form/OkrList'
import UserSelect from '../form/UserSelect'
import KeyResultMemberSelect from '../form/KeyResultMemberSelect'
import AutoInput from '../form/AutoInput'
import PopupButton from '../util/PopupButton'

class KeyResultInfoPane extends PureComponent {
  handleObjectiveChange = value => this.props.updateOkr({ objectiveId: value })

  // For KeyResult method.
  handleNameCommit = name => this.props.updateKeyResult({ name })

  handleKeyResultMemberAdd = value => this.props.updateKeyResult({ member: { user: value, behavior: 'add', role: 'member' } })
  handleKeyResultMemberRemove = value => {
    const removeAction = () => this.props.updateKeyResult({
      member: { user: value, behavior: 'remove' }
    })
    if (this.props.keyResult.get('childObjectives').some(objective => objective.getIn(['owner', 'id']) === value)) {
      const user = this.props.users.find(user => user.get('id') === value)
      this.props.confirm({
        content: `下位 Objective が紐付いています。関係者 "${user.get('lastName')} ${user.get('firstName')}" を削除しますか？`,
        onConfirm: removeAction,
      })
    } else {
      removeAction()
    }
  }

  handleOwnerChange = ownerId => {
    const updateKeyResultOwner = () => this.props.updateKeyResult({ member: { user: ownerId, behavior: 'add', role: 'owner' } })
    if (!this.props.isObjectiveOwner && this.props.isKeyResultOwner && ownerId !== this.props.loginUserId) {
      // O 責任者でない KR 責任者 (非管理者) が自分以外に変更しようとした場合
      this.props.confirm({
        content: 'Key Result 責任者を他ユーザーに変更すると自分では戻せなくなります。変更しますか？',
        onConfirm: updateKeyResultOwner,
      })
    } else {
      updateKeyResultOwner()
    }
  }

  handleCreateClick = () => this.props.openObjectiveModal(this.props.okr)
  handleRemoveClick = () => {
    const { keyResult, removeKeyResult, confirm } = this.props
    let message = `Key Result "${keyResult.get('name')}" を完全に削除しますか？`
    const hasChild = !keyResult.get('childObjectiveIds').isEmpty()
    if (hasChild) {
      message += 'Key Result に紐付く下位 Objective は自動的に紐付きが解除されます。'
    }
    message += ' (この操作は元に戻せません)'
    confirm({
      content: message,
      onConfirm: () => removeKeyResult(keyResult.get('id')),
    })
  }

  handleDisableClick = () => {
    const { keyResult, disableKeyResult, confirm } = this.props
    const enabledOrDisabled = keyResult.get('disabled') ? '有効化' : '無効化'
    let message = `Key Result "${keyResult.get('name')}" を${enabledOrDisabled}しますか？`
    const hasChild = !keyResult.get('childObjectiveIds').isEmpty()
    if (hasChild) {
      message += `Key Result に紐付く全ての下位 OKR も自動的に${enabledOrDisabled}されます。`
    }
    confirm({
      content: message,
      onConfirm: () => disableKeyResult(keyResult),
    })
  }

  render() {
    const keyResult = this.props.okr
    const childObjectives = keyResult.get('childObjectives')
    const isOwner = this.props.isObjectiveOwner || this.props.isKeyResultOwner
    const isDisabled = keyResult.get('disabled')

    return (
      <Form>
        <Form.Field className='flex-field'>
          <label>Key Result</label>
          <div className="flex-field__item">
            <AutoInput value={keyResult.get('name')} onCommit={this.handleNameCommit} />
          </div>
        </Form.Field>

        <Form.Field className='flex-field'>
          <label>責任者</label>
          <div className='flex-field__item'>
            <UserSelect
              users={this.props.users}
              value={keyResult.getIn(['owner', 'id'])}
              onChange={this.handleOwnerChange}
            />
          </div>
        </Form.Field>

        <Form.Field className='flex-field'>
          <label>関係者</label>
          <div className='flex-field__item key-result-members'>
            <KeyResultMemberSelect
              users={this.props.users}
              members={keyResult.get('members').map(member => member.get('id'))}
              includedId={isOwner ? null : this.props.loginUserId}
              excludedId={keyResult.getIn(['owner', 'id'])}
              add={this.handleKeyResultMemberAdd}
              remove={this.handleKeyResultMemberRemove}
            />
          </div>
        </Form.Field>

        <Form.Field>
          <label>紐付く Objective</label>
          <OkrSelect
            okrs={this.props.candidates}
            value={keyResult.get('objectiveId')}
            readOnly={!this.props.isObjectiveOwner}
            loading={!this.props.isFetchedCandidates}
            onChange={this.handleObjectiveChange}
          />
        </Form.Field>
        <Divider hidden />
        {!childObjectives.isEmpty() && (
          <Form.Field>
            <label>下位 Objective 一覧</label>
            <OkrList okrs={childObjectives} />
          </Form.Field>
        )}

        <Form.Group className="okr-buttons">
          <PopupButton
            icon="trash"
            tips="完全に削除する"
            negative
            inForm
            onClick={this.handleRemoveClick}
          />
          <Form.Button
            icon={isDisabled ? 'undo' : 'dont'}
            content={isDisabled ? '有効化する' : '無効化する'}
            onClick={this.handleDisableClick}
            negative={!isDisabled}
          />
          <Form.Button
            icon="plus"
            content="下位 OKR を作成する"
            onClick={this.handleCreateClick}
            positive
          />
        </Form.Group>
      </Form>
    )
  }
}

KeyResultInfoPane.propTypes = {
  // container
  // component
  okr: ImmutablePropTypes.map.isRequired,
  keyResult: ImmutablePropTypes.map.isRequired,
  candidates: ImmutablePropTypes.list.isRequired,
  isObjectiveOwner: PropTypes.bool.isRequired,
  isFetchedCandidates: PropTypes.bool.isRequired,
  updateOkr: PropTypes.func.isRequired,
  openObjectiveModal: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  disableKeyResult: PropTypes.func.isRequired,
}

export default KeyResultInfoPane

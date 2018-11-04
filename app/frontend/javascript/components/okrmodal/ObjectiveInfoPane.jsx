import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Form, Divider } from 'semantic-ui-react'
import OkrSelect from '../form/OkrSelect'
import OkrList from '../form/OkrList'
import AutoInput from '../form/AutoInput'
import UserSelect from '../form/UserSelect'
import PopupButton from '../util/PopupButton'

class ObjectiveInfoPane extends PureComponent {

  handleNameCommit = name => this.props.updateOkr({ name })

  handleParentKeyResultChange = value => this.props.updateOkr({ parentKeyResultId: value === -1 ? null : value })

  handleOwnerChange = ownerId => {
    const updateObjectiveOwner = () => this.props.updateOkr({ objectiveMember: { user: ownerId } })
    if (!this.props.isAdmin && this.props.isObjectiveOwner && ownerId !== this.props.loginUserId) {
      // O 責任者 (非管理者) が自分以外に変更しようとした場合
      this.props.confirm({
        content: 'Objective 責任者を他ユーザーに変更すると自分では戻せなくなります。変更しますか？',
        onConfirm: updateObjectiveOwner,
      })
    } else {
      updateObjectiveOwner()
    }
  }

  handleRemoveClick = () => {
    const { objective, removeObjective, confirm } = this.props
    let message = `Objective "${objective.get('name')}" を完全に削除しますか？`
    const keyResults = objective.get('keyResults')
    if (!keyResults.isEmpty()) {
      message += 'Objective に紐付く Key Result も削除されます。'
      const hasChild = keyResults.some(keyResult => !keyResult.get('childObjectiveIds').isEmpty())
      if (hasChild) {
        message += 'Key Result に紐付く下位 Objective は自動的に紐付きが解除されます。'
      }
    }
    message += ' (この操作は元に戻せません)'
    confirm({
      content: message,
      onConfirm: () => removeObjective(objective.get('id')),
    })
  }

  render() {
    const objective = this.props.okr
    const parentKeyResult = objective.get('parentKeyResult')
    const childObjectives = parentKeyResult && parentKeyResult.get('childObjectives')
    const isDisabled = objective.get('disabled')

    return (
      <Form>
        <Form.Field className='flex-field'>
          <label>Objective</label>
          <div className="flex-field__item">
            <AutoInput value={objective.get('name')} onCommit={this.handleNameCommit} />
          </div>
        </Form.Field>

        <Form.Field className='flex-field'>
          <label>責任者</label>
          <div className='flex-field__item'>
            <UserSelect
              users={this.props.users}
              value={objective.getIn(['owner', 'id'])}
              onChange={this.handleOwnerChange}
            />
          </div>
        </Form.Field>

        <Form.Field>
          <label>上位 Key Result</label>
          <OkrSelect
            okrs={this.props.candidates}
            isObjective={false}
            value={objective.get('parentKeyResultId')}
            readOnly={!this.props.isObjectiveOwner}
            loading={!this.props.isFetchedCandidates}
            onChange={this.handleParentKeyResultChange}
          />
        </Form.Field>

        <Divider hidden />
        {childObjectives && !childObjectives.isEmpty() && (
          <Form.Field>
            <label>上位 Key Result に紐付く下位 Objective 一覧</label>
            <OkrList okrs={childObjectives} />
          </Form.Field>
        )}

        <Form.Group className="okr-buttons">
          <PopupButton icon="trash" tips="完全に削除する" negative inForm onClick={this.handleRemoveClick} />
          <Form.Button
            icon={isDisabled ? 'undo' : 'dont'}
            content={isDisabled ? '有効化する' : '無効化する'}
            onClick={this.handleDisableClick}
            negative={!isDisabled}
          />
        </Form.Group>

      </Form>
    )
  }
}

ObjectiveInfoPane.propTypes = {
  // container
  // component
  okr: ImmutablePropTypes.map.isRequired,
  candidates: ImmutablePropTypes.list.isRequired,
  isObjectiveOwner: PropTypes.bool.isRequired,
  isFetchedCandidates: PropTypes.bool.isRequired,
  updateOkr: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
}

export default ObjectiveInfoPane

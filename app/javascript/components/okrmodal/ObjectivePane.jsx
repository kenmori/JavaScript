import React, { PureComponent } from 'react'
import { Map } from 'immutable'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Form, Label } from 'semantic-ui-react'
import AutoInput from '../form/AutoInput'
import NumberInput from '../form/NumberInput'
import UserSelect from '../form/UserSelect'
import OkrDescription from '../form/OkrDescription'
import PopupButton from '../util/PopupButton'
import PopupLabel from '../util/PopupLabel'

class ObjectivePane extends PureComponent {

  constructor(props) {
    super(props)
    this.state = { progressRate: props.objective.get('progressRate') }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.objective.get('progressRate') !== nextProps.objective.get('progressRate')) {
      this.setState({ progressRate: nextProps.objective.get('progressRate') })
    }
  }

  handleNameCommit = name => this.props.updateObjective({ name })

  handleProgressRateChange = progressRate => this.setState({ progressRate })

  handleProgressRateCommit = progressRate => this.props.updateObjective({ progressRate: progressRate || null })

  handleSubProgressRateClick = () => this.props.updateObjective({ progressRate: null })

  handleDescriptionCommit = description => this.props.updateObjective({ description })

  handleOwnerChange = ownerId => {
    const updateObjectiveOwner = () => this.props.updateObjective({ objectiveMember: { user: ownerId } })
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

  handleDisableClick = () => {
    const { objective, disableObjective, confirm } = this.props
    const enabledOrDisabled = objective.get('disabled') ? '有効化' : '無効化'
    let message = `Objective "${objective.get('name')}" を${enabledOrDisabled}しますか？`
    const keyResults = objective.get('keyResults')
    if (!keyResults.isEmpty()) {
      message += `Objective に紐付く Key Result も${enabledOrDisabled}されます。`
      const hasChild = keyResults.some(keyResult => !keyResult.get('childObjectiveIds').isEmpty())
      if (hasChild) {
        message += `Key Result に紐付く全ての下位 OKR も自動的に${enabledOrDisabled}されます。`
      }
    }
    confirm({
      content: message,
      onConfirm: () => disableObjective(objective),
    })
  }

  subProgressRateHtml(objective) {
    const progressRate = objective.get('progressRate')
    const subProgressRate = objective.get('subProgressRate')
    return (typeof subProgressRate === 'number') && progressRate !== subProgressRate && (
      <div className='flex-field__item'>
        <PopupLabel
          icon="unlinkify"
          text={`Key Result 一覧 の進捗は ${subProgressRate}% です`}
          tips="クリックすると Key Result 一覧の進捗が設定されます"
          onClick={this.handleSubProgressRateClick}
        />
      </div>
    )
  }

  parentKeyResultProgressRateHtml(parentKeyResult) {
    if (!parentKeyResult) return null
    const progressRate = parentKeyResult.get('progressRate')
    const subProgressRate = parentKeyResult.get('subProgressRate')
    return (typeof subProgressRate === 'number') && progressRate !== subProgressRate && (
      <div className='flex-field__item--block'>
        <Label pointing='above' content={`上位 Key Result の進捗は ${subProgressRate}% から ${progressRate}% に変更されています`} />
      </div>
    )
  }

  render() {
    const objective = this.props.objective
    const { progressRate } = this.state
    const isDisabled = objective.get('disabled')
    return (
      <Form>
        <Form.Field>
          <AutoInput value={objective.get('name')} onCommit={this.handleNameCommit} />
        </Form.Field>
        <Form.Field className='flex-field'>
          <label>進捗</label>
          <div className="flex-field__item">
            <NumberInput
              label='%'
              value={progressRate}
              onChange={this.handleProgressRateChange}
              onCommit={this.handleProgressRateCommit}
            />
          </div>
          <div className='flex-field__item slider'>
            <NumberInput
              type='range'
              value={progressRate}
              onChange={this.handleProgressRateChange}
              onMouseUp={this.handleProgressRateCommit}
            />
          </div>
          {this.subProgressRateHtml(objective)}
          {this.parentKeyResultProgressRateHtml(objective.get('parentKeyResult'))}
        </Form.Field>
        <Form.Field className='flex-field'>
          <label>責任者</label>
          <div className='flex-field__item'>
            <UserSelect
              users={this.props.users}
              value={objective.get('owner').get('id')}
              onChange={this.handleOwnerChange}
            />
          </div>
        </Form.Field>
        <Form.Field>
          <label>説明</label>
          <OkrDescription
            text={objective.get('description')}
            onCommit={this.handleDescriptionCommit}
          />
        </Form.Field>

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

ObjectivePane.propTypes = {
  // container
  disableObjective: PropTypes.func.isRequired,
  // component
  objective: ImmutablePropTypes.map.isRequired,
  users: ImmutablePropTypes.list.isRequired,
  loginUserId: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isObjectiveOwner: PropTypes.bool.isRequired,
  updateObjective: PropTypes.func.isRequired,
  removeObjective: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
}

export default ObjectivePane

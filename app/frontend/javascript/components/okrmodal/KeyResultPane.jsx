import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Form, Label } from 'semantic-ui-react'
import DatePicker from '../form/DatePicker'
import AutoInput from '../form/AutoInput'
import NumberInput from '../form/NumberInput'
import UserSelect from '../form/UserSelect'
import KeyResultMemberSelect from '../form/KeyResultMemberSelect'
import OkrDescription from '../form/OkrDescription'
import StatusRadio from '../util/StatusRadio'
import PopupButton from '../util/PopupButton'
import PopupLabel from '../util/PopupLabel'
import moment from 'moment'

class KeyResultPane extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      progressRate: props.keyResult.get('progressRate'),
      isTargetValueVisible: typeof props.keyResult.get('targetValue') === 'number',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.keyResult.get('id') !== nextProps.keyResult.get('id')) {
      this.setState({
        progressRate: nextProps.keyResult.get('progressRate'),
        isTargetValueVisible: typeof nextProps.keyResult.get('targetValue') === 'number',
      })
    } else if (this.props.keyResult.get('progressRate') !== nextProps.keyResult.get('progressRate')) {
      this.setState({
        progressRate: nextProps.keyResult.get('progressRate'),
      })
    }
  }

  handleNameCommit = name => this.props.updateKeyResult({ name })

  handleTargetValueCommit = targetValue => this.props.updateKeyResult({ targetValue })

  handleActualValueCommit = actualValue => this.props.updateKeyResult({ actualValue })

  handleValueUnitCommit = valueUnit => this.props.updateKeyResult({ valueUnit })

  handleTargetValueVisibleClick = () => this.setState({ isTargetValueVisible: true })

  handleProgressRateChange = progressRate => this.setState({ progressRate })

  handleProgressRateCommit = progressRate => this.props.updateKeyResult({ progressRate: progressRate || null })

  handleSubProgressRateClick = () => this.props.updateKeyResult({ progressRate: null })

  handleExpiredDateChange = expiredDate => this.props.updateKeyResult({ expiredDate: expiredDate.format('YYYY-MM-DD') })

  handleStatusChange = status => this.props.updateKeyResult({ status })

  handleDescriptionCommit = description => this.props.updateKeyResult({ description })

  handleResultCommit = result => this.props.updateKeyResult({ result })

  handleCreateClick = () => this.props.openObjectiveModal(this.props.keyResult)

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
  
  subProgressRateHtml(keyResult) {
    const progressRate = keyResult.get('progressRate')
    const subProgressRate = keyResult.get('subProgressRate')
    return (typeof subProgressRate === 'number') && progressRate !== subProgressRate && (
      <div className='flex-field__item'>
        <PopupLabel
          icon="unlinkify"
          text={`下位 OKR の進捗は ${subProgressRate}% です`}
          tips="クリックすると下位 OKR の進捗が設定されます"
          onClick={this.handleSubProgressRateClick}
        />
      </div>
    )
  }

  render() {
    const keyResult = this.props.keyResult
    const isOwner = this.props.isObjectiveOwner || this.props.isKeyResultOwner
    const [targetValue, actualValue] = [keyResult.get('targetValue'), keyResult.get('actualValue')]
    const isDisabled = keyResult.get('disabled')
    return (
      <Form>
        <Form.Field className='flex-field'>
          <label>Key Result</label>
          <div className="flex-field__item">
            <AutoInput value={keyResult.get('name')} onCommit={this.handleNameCommit} />
          </div>
        </Form.Field>

        {this.state.isTargetValueVisible ? (
          <Form.Group>
            <Form.Field className='flex-field'>
              <label>目標値</label>
              <div className='flex-field__item'>
                <AutoInput
                  value={typeof targetValue === 'number' ? targetValue : ''}
                  placeholder='数値'
                  onCommit={this.handleTargetValueCommit}
                />
                <AutoInput
                  value={keyResult.get('valueUnit') || ''}
                  placeholder='単位'
                  onCommit={this.handleValueUnitCommit}
                />
              </div>
            </Form.Field>

            <Form.Field className='flex-field'>
              <label>実績値</label>
              <div className='flex-field__item'>
                <AutoInput
                  value={typeof actualValue === 'number' ? actualValue : ''}
                  placeholder='数値'
                  onCommit={this.handleActualValueCommit}
                />
              </div>
              <div className='flex-field__item'>{keyResult.get('valueUnit') || ''}</div>
              {keyResult.get('achievementRate') >= 100 && (
                <div className='flex-field__item'>
                  <Label pointing='left' content={`達成率は ${keyResult.get('achievementRate')}% です！`} />
                </div>
              )}
            </Form.Field>
          </Form.Group>
        ) : (
          <Form.Button content="目標値を設定する" onClick={this.handleTargetValueVisibleClick} size="small" floated='right' />
        )}

        <Form.Field className='flex-field progress-rate-field'>
          <label>進捗</label>
          <div className="flex-field__item">
            <NumberInput
              label="%"
              value={this.state.progressRate}
              onChange={this.handleProgressRateChange}
              onCommit={this.handleProgressRateCommit}
            />
          </div>
          <div className='flex-field__item slider'>
            <NumberInput
              type="range"
              value={this.state.progressRate}
              onChange={this.handleProgressRateChange}
              onMouseUp={this.handleProgressRateCommit}
            />
          </div>
          {this.subProgressRateHtml(keyResult)}
        </Form.Field>

        <Form.Field className='flex-field input-date-picker'>
          <label>期限</label>
          <div className='flex-field__item'>
            <DatePicker
              dateFormat="YYYY/M/D"
              locale="ja"
              selected={moment(keyResult.get('expiredDate'))}
              onChange={this.handleExpiredDateChange}
            />
          </div>
        </Form.Field>

        <Form.Field className="flex-field">
          <label>見通し</label>
          <div className="flex-field__item">
            <StatusRadio status={keyResult.get('status')} onChange={this.handleStatusChange} />
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
          <label>説明</label>
          <OkrDescription
            key={keyResult.get('id')}
            text={keyResult.get('description')}
            onCommit={this.handleDescriptionCommit}
          />
        </Form.Field>

        <Form.Field className='flex-field'>
          <label>結果</label>
          <div className='flex-field__item'>
            <AutoInput
              value={keyResult.get('result') || ''}
              placeholder='Key Result の最終的な進捗を補足する結果を入力してください'
              onCommit={this.handleResultCommit}
            />
          </div>
        </Form.Field>

        <Form.Group className="okr-buttons">
          <PopupButton icon="trash" tips="完全に削除する" negative inForm onClick={this.handleRemoveClick} />
          <Form.Button
            icon={isDisabled ? 'undo' : 'dont'}
            content={isDisabled ? '有効化する' : '無効化する'}
            onClick={this.handleDisableClick}
            negative={!isDisabled}
          />
          <Form.Button icon="plus" content="下位 OKR を作成する" onClick={this.handleCreateClick} positive />
        </Form.Group>
      </Form>
    )
  }
}

KeyResultPane.propTypes = {
  // container
  isKeyResultOwner: PropTypes.bool.isRequired,
  disableKeyResult: PropTypes.func.isRequired,
  // component
  keyResult: ImmutablePropTypes.map.isRequired,
  users: ImmutablePropTypes.list.isRequired,
  loginUserId: PropTypes.number.isRequired,
  isObjectiveOwner: PropTypes.bool.isRequired,
  updateKeyResult: PropTypes.func.isRequired,
  removeKeyResult: PropTypes.func.isRequired,
  openObjectiveModal: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
}

export default KeyResultPane

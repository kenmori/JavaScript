import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Form, Label } from 'semantic-ui-react'
import DatePicker from '../form/DatePicker'
import AutoInput from '../form/AutoInput'
import NumberInput from '../form/NumberInput'
import StatusRadio from '../util/StatusRadio'
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

  handleTargetValueCommit = targetValue => this.props.updateKeyResult({ targetValue })

  handleActualValueCommit = actualValue => this.props.updateKeyResult({ actualValue })

  handleValueUnitCommit = valueUnit => this.props.updateKeyResult({ valueUnit })

  handleTargetValueVisibleClick = () => this.setState({ isTargetValueVisible: true })

  handleProgressRateChange = progressRate => this.setState({ progressRate })

  handleProgressRateCommit = progressRate => this.props.updateKeyResult({ progressRate: progressRate || null })

  handleSubProgressRateClick = () => this.props.updateKeyResult({ progressRate: null })

  handleExpiredDateChange = expiredDate => this.props.updateKeyResult({ expiredDate: expiredDate.format('YYYY-MM-DD') })

  handleStatusChange = status => this.props.updateKeyResult({ status })

  handleResultCommit = result => this.props.updateKeyResult({ result })

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
    const [targetValue, actualValue] = [keyResult.get('targetValue'), keyResult.get('actualValue')]
    return (
      <Form>
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
          <label>結果</label>
          <div className='flex-field__item'>
            <AutoInput
              value={keyResult.get('result') || ''}
              placeholder='Key Result の最終的な進捗を補足する結果を入力してください'
              onCommit={this.handleResultCommit}
            />
          </div>
        </Form.Field>
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

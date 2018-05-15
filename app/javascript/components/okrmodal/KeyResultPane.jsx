import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Form, Label, Popup, Button, Divider } from 'semantic-ui-react';
import DatePicker from '../form/DatePicker';
import AutoInput from '../form/AutoInput';
import AutoTextArea from '../form/AutoTextArea';
import NumberInput from '../form/NumberInput';
import UserSelect from '../form/UserSelect';
import KeyResultMemberSelect from '../form/KeyResultMemberSelect';
import moment from 'moment';

class KeyResultPane extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      progressRate: props.keyResult.get('progressRate'),
      isTargetValueVisible: !!props.keyResult.get('targetValue'),
    };
  }

  addMember = value => {
    this.props.updateKeyResult({
      member: {user: value, behavior: 'add', role: 'member'}
    });
  }

  removeMember = value => {
    const removeAction = () => this.props.updateKeyResult({
      member: { user: value, behavior: 'remove' }
    });
    if (this.props.keyResult.get('childObjectives').some(objective => objective.get('owner').get('id') === value)) {
      this.props.confirm({
        content: '下位 Objective が紐付いています。関係者を削除しますか？',
        onConfirm: removeAction,
      });
    } else {
      removeAction();
    }
  }

  changeKeyResultOwner = ownerId => {
    const updateKeyResultOwner = () => this.props.updateKeyResult({ member: { user: ownerId, behavior: 'add', role: 'owner' } })
    if (!this.props.isObjectiveOwner && this.props.isKeyResultOwner && ownerId !== this.props.loginUserId) {
      // O 責任者でない KR 責任者 (非管理者) が自分以外に変更しようとした場合
      this.props.confirm({
        content: 'Key Result 責任者を他人に変更すると自分に戻すことはできません。変更しますか？',
        onConfirm: updateKeyResultOwner,
      })
    } else {
      updateKeyResultOwner()
    }
  }
  
  updateKeyResult(name, value) {
    this.props.updateKeyResult({ [name]: value });
  }

  removeKeyResult(id) {
    this.props.confirm({
      content: this.props.keyResult.get('childObjectives').isEmpty()
        ? 'Key Result を削除しますか？' : '下位 Objective が紐付いています。Key Result を削除しますか？',
      onConfirm: () => this.props.removeKeyResult(id),
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.keyResult.get('id') !== nextProps.keyResult.get('id')) {
      this.setState({
        progressRate: nextProps.keyResult.get('progressRate'),
        isTargetValueVisible: !!nextProps.keyResult.get('targetValue'),
      })
    } else if (this.props.keyResult.get('progressRate') !== nextProps.keyResult.get('progressRate')) {
      this.setState({
        progressRate: nextProps.keyResult.get('progressRate'),
      });
    }
  }
  
  childObjectiveProgressRateHtml(keyResult) {
    const progressRate = keyResult.get('progressRate');
    const childProgressRate = keyResult.get('childProgressRate');
    return (typeof childProgressRate === 'number') && progressRate !== childProgressRate && (
      <div className='flex-field__item'>
        <Popup trigger={<Label pointing='left' as='a' icon='unlinkify'
                               content={`下位 OKR の進捗は ${childProgressRate}% です`}
                               onClick={this.handleChildProgressRateClick} />}
               position='bottom left'
               size='tiny'
               content='クリックすると下位 OKR の進捗が設定されます'
        />
      </div>
    );
  }

  handleChildProgressRateClick = () => this.props.updateKeyResult({ progressRate: null })

  handleNameCommit = value => this.updateKeyResult('name', value)

  handleTargetValueCommit = value => this.updateKeyResult('targetValue', value)

  handleValueUnitCommit = value => this.updateKeyResult('valueUnit', value)

  handleActualValueCommit = value => this.updateKeyResult('actualValue', value)

  handleTargetValueVisibleClick = () => this.setState({ isTargetValueVisible: true })

  handleProgressRateChange = progressRate => this.setState({ progressRate })

  handleProgressRateCommit = value => this.updateKeyResult('progressRate', Number(value))

  handleExpiredDateChange = value => this.updateKeyResult('expiredDate', value.format('YYYY-MM-DD'))

  handleOwnerChange = value => this.changeKeyResultOwner(value)

  handleDescriptionCommit = value => this.props.updateKeyResult({ description: value })

  handleRemoveClick = () => {this.removeKeyResult(this.props.keyResult.get('id'))}

  handleCreateChildOkrClick = () => this.props.openObjectiveModal(this.props.keyResult)

  handleResultCommit = result => this.props.updateKeyResult({ result })

  render() {
    const keyResult = this.props.keyResult;
    const keyResultId = keyResult.get('id')
    const isOwner = this.props.isObjectiveOwner || this.props.isKeyResultOwner;
    return (
      <Form>
        <Form.Field>
          <AutoInput value={keyResult.get('name')}
                     onCommit={this.handleNameCommit}
          />
        </Form.Field>

        {this.state.isTargetValueVisible ? (
          <Form.Group>
            <Form.Field className='flex-field'>
              <label>目標値</label>
              <div className='flex-field__item'>
                <AutoInput value={keyResult.get('targetValue') || ''} placeholder='数値' onCommit={this.handleTargetValueCommit} />
                <AutoInput value={keyResult.get('valueUnit') || ''} placeholder='単位' onCommit={this.handleValueUnitCommit} />
              </div>
            </Form.Field>
            <Form.Field className='flex-field'>
              <label>実績値</label>
              <div className='flex-field__item'>
                <AutoInput value={keyResult.get('actualValue') || ''} placeholder='数値' onCommit={this.handleActualValueCommit} />
              </div>
              <div className='flex-field__item'>
                {keyResult.get('valueUnit') || ''}
              </div>
              {keyResult.get('achievementRate') >= 100 && (
                <div className='flex-field__item'>
                  <Label pointing='left' content={`達成率は ${keyResult.get('achievementRate')}% です！`} />
                </div>
              )}
            </Form.Field>
          </Form.Group>
        ) : (
          <div>
            <Button content="目標値を設定する" onClick={this.handleTargetValueVisibleClick} floated='right' />
          </div>
        )}

        <Form.Field className='flex-field progress-rate-field'>
          <label>進捗</label>
          <div className="flex-field__item progress-rate">
            <NumberInput label='%'
                         value={this.state.progressRate}
                         onChange={this.handleProgressRateChange}
                         onCommit={this.handleProgressRateCommit}
            />
          </div>
          <div className='flex-field__item slider'>
            <NumberInput type='range'
                         value={this.state.progressRate}
                         onChange={this.handleProgressRateChange}
                         onMouseUp={this.handleProgressRateCommit}
            />
          </div>
          {this.childObjectiveProgressRateHtml(keyResult)}
        </Form.Field>

        <Form.Field className='flex-field input-date-picker'>
          <label>期限</label>
          <div className='flex-field__item'>
            <DatePicker dateFormat="YYYY/M/D" locale="ja"
                        selected={moment(keyResult.get('expiredDate'))}
                        onChange={this.handleExpiredDateChange}
            />
          </div>
        </Form.Field>
        <Form.Field className='flex-field'>
          <label>責任者</label>
          <div className='flex-field__item'>
            <UserSelect
              users={this.props.users}
              value={keyResult.get('owner').get('id')}
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
              excludedId={keyResult.get('owner').get('id')}
              add={this.addMember}
              remove={this.removeMember}
            />
          </div>
        </Form.Field>
        <Form.Field>
          <label>説明</label>
          <AutoTextArea key={keyResultId} value={keyResult.get('description')}
                        placeholder={`Key Result についての説明や補足を入力してください。\n説明を入力すると、メンバーに目指すべき方向性が伝わりやすくなります。`}
                        onCommit={this.handleDescriptionCommit}
          />
        </Form.Field>
        <Form.Field className='flex-field'>
          <label>結果</label>
          <div className='flex-field__item'>
            <AutoInput value={keyResult.get('result') || ''} onCommit={this.handleResultCommit} />
          </div>
        </Form.Field>

        <Divider hidden />

        <div>
          <Button content="削除する" onClick={this.handleRemoveClick} as="span" negative floated='right' />
          <Button content="下位 OKR を作成する" onClick={this.handleCreateChildOkrClick} as="span" positive floated='right' />
        </div>

        <Divider hidden clearing />
      </Form>
    );
  }
}

KeyResultPane.propTypes = {
  // container
  isKeyResultOwner: PropTypes.bool.isRequired,
  // component
  keyResult: ImmutablePropTypes.map.isRequired,
  users: ImmutablePropTypes.list.isRequired,
  loginUserId: PropTypes.number.isRequired,
  isObjectiveOwner: PropTypes.bool.isRequired,
  updateKeyResult: PropTypes.func.isRequired,
  removeKeyResult: PropTypes.func.isRequired,
  openObjectiveModal: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default KeyResultPane;

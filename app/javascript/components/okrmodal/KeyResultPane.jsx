import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { Form, Label, Popup, Button, Divider } from 'semantic-ui-react';
import OkrList from '../form/OkrList';
import DatePicker from '../form/DatePicker';
import AutoInput from '../form/AutoInput';
import NumberInput from '../form/NumberInput';
import UserSelect from '../form/UserSelect';
import KeyResultMemberSelect from '../form/KeyResultMemberSelect';
import OkrSelect from '../form/OkrSelect';
import moment from 'moment';

class KeyResultPane extends Component {

  constructor(props) {
    super(props);
    this.state = this.getState(props);
  }

  getState(props) {
    return {
      name: props.keyResult.get('name'),
      targetValue: props.keyResult.get('targetValue') || '',
      actualValue: props.keyResult.get('actualValue') || '',
      valueUnit: props.keyResult.get('valueUnit') || '',
      progressRate: props.keyResult.get('progressRate'),
      expiredDate: props.keyResult.get('expiredDate'),
      isTargetValueVisible: !!props.keyResult.get('targetValue'),
    };
  }

  addMember(value) {
    this.updateKeyResult({
      member: {user: value, behavior: 'add', role: 'member'}
    });
  }

  removeMember(value) {
    const removeAction = () => this.updateKeyResult({
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

  changeKeyResultOwner(value) {
    this.updateKeyResult({
      member: {user: value, behavior: 'add', role: 'owner'}
    });
  }

  updateKeyResult(values) {
    this.props.updateKeyResult({ id: this.props.keyResult.get('id'), ...values });
  }
  
  updateKeyResultWithState(name, value) {
    if (this.state[name] !== value) {
      this.setState({ [name]: value });
      this.updateKeyResult({ [name]: value });
    }
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
      this.setState(this.getState(nextProps));
    } else if (this.props.keyResult.get('progressRate') !== nextProps.keyResult.get('progressRate')) {
      this.setState({
        progressRate: nextProps.keyResult.get('progressRate'),
      });
    }
  }

  childObjectivesTag(childObjectives) {
    if (childObjectives.isEmpty()) return null;
    return (
      <Form.Field>
        <label>下位 Objective 一覧</label>
        <OkrList okrs={childObjectives} />
      </Form.Field>
    );
  }
  
  childObjectiveProgressRateHtml(keyResult) {
    const progressRate = keyResult.get('progressRate');
    const childProgressRate = keyResult.get('childProgressRate');
    return progressRate !== childProgressRate && typeof childProgressRate === 'number' && (
      <div className='flex-field__item'>
        <Popup trigger={<Label pointing='left' as='a' icon='unlinkify'
                               content={`下位 OKR の進捗は ${childProgressRate}% です`}
                               onClick={() => this.updateKeyResult({ 'progressRate': null })} />}
               position='bottom left'
               size='tiny'
               content='クリックすると下位 OKR の進捗が設定されます'
        />
      </div>
    );
  }

  render() {
    const keyResult = this.props.keyResult;
    const members = keyResult.get('members').map(member => member.get('id')).toArray();
    const isOwner = this.props.isObjectiveOwner || keyResult.get('owner').get('id') === this.props.loginUserId;
    return (
      <Form>
        <Form.Field>
          <AutoInput value={this.state.name}
                     onCommit={value => this.updateKeyResultWithState('name', value)}
          />
        </Form.Field>

        {this.state.isTargetValueVisible &&
          <Form.Field className='flex-field'>
            <label>目標値</label>
            <div className='flex-field__item'>
              <AutoInput value={this.state.targetValue}
                         onCommit={value => this.updateKeyResultWithState('targetValue', value)}
              />
              <AutoInput value={this.state.valueUnit}
                         placeholder='単位'
                         onCommit={value => this.updateKeyResultWithState('valueUnit', value)}
              />
            </div>
          </Form.Field>
        }
        {this.state.isTargetValueVisible &&
          <Form.Field className='flex-field'>
            <label>実績値</label>
            <div className='flex-field__item'>
              <AutoInput value={this.state.actualValue}
                         onCommit={value => this.updateKeyResultWithState('actualValue', value)}
              />
            </div>
            <div className='flex-field__item'>
              {this.state.valueUnit}
            </div>
          </Form.Field>
        }
        {!this.state.isTargetValueVisible &&
          <div>
            <Button content="目標値を設定する" onClick={() => this.setState({isTargetValueVisible: true})} floated='right' />
          </div>
        }

        <Form.Field className='flex-field progress-rate-field'>
          <label>進捗</label>
          <div className="flex-field__item progress-rate">
            <NumberInput label='%'
                         value={this.state.progressRate}
                         onChange={progressRate => this.setState({ progressRate })}
                         onCommit={value => this.updateKeyResultWithState('progressRate', Number(value))}
            />
          </div>
          <div className='flex-field__item slider'>
            <NumberInput type='range'
                         value={this.state.progressRate}
                         onChange={progressRate => this.setState({ progressRate })}
                         onMouseUp={value => this.updateKeyResultWithState('progressRate', Number(value))}
            />
          </div>
          {this.childObjectiveProgressRateHtml(keyResult)}
          {keyResult.get('achievementRate') >= 100 && (
            <div className='flex-field__item--block'>
              <Label pointing='above' content={`達成率は ${keyResult.get('achievementRate')}% です！`} />
            </div>
          )}
        </Form.Field>

        <Form.Field className='flex-field input-date-picker'>
          <label>期限</label>
          <div className='flex-field__item'>
            <DatePicker dateFormat="YYYY/M/D" locale="ja"
                        selected={moment(this.state.expiredDate)}
                        onChange={value => this.updateKeyResultWithState('expiredDate', value.format('YYYY-MM-DD'))}
            />
          </div>
        </Form.Field>
        <Form.Field className='flex-field'>
          <label>責任者</label>
          <div className='flex-field__item'>
            <UserSelect
              users={this.props.users}
              value={keyResult.get('owner').get('id')}
              onChange={(value) => this.changeKeyResultOwner(value)}
            />
          </div>
        </Form.Field>
        <Form.Field className='flex-field'>
          <label>関係者</label>
          <div className='flex-field__item key-result-members'>
            <KeyResultMemberSelect
              users={this.props.users}
              members={members}
              includedId={isOwner ? null : this.props.loginUserId}
              excludedId={keyResult.get('owner').get('id')}
              add={this.addMember.bind(this)}
              remove={this.removeMember.bind(this)}
            />
          </div>
        </Form.Field>

        <Divider hidden />

        <div>
          <Button content="削除する" onClick={() => {this.removeKeyResult(keyResult.get('id'))}} as="span" negative floated='right' />
          <Button content="下位 OKR を作成する" onClick={() => this.props.changeToObjectiveModal(keyResult)} as="span" positive floated='right' />
        </div>

        <Divider hidden clearing />

        <Form.Field>
          <label>紐付く Objective</label>
          <OkrSelect
            okrs={this.props.objectives}
            value={keyResult.get('objectiveId')}
            readOnly={!this.props.isObjectiveOwner}
            loading={!this.props.isFetchedObjectives}
            onChange={value => this.updateKeyResult({ objectiveId: value })}
          />
        </Form.Field>
        {this.childObjectivesTag(keyResult.get('childObjectives'))}
      </Form>
    );
  }
}

KeyResultPane.propTypes = {
  keyResult: PropTypes.object.isRequired,
  objectives: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  loginUserId: PropTypes.number.isRequired,
  isObjectiveOwner: PropTypes.bool.isRequired,
  isFetchedObjectives: PropTypes.bool.isRequired,
  updateKeyResult: PropTypes.func.isRequired,
  removeKeyResult: PropTypes.func.isRequired,
  changeToObjectiveModal: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default KeyResultPane;

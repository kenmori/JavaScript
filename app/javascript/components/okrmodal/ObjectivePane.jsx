import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Form, Label, Popup } from 'semantic-ui-react';
import AutoInput from '../form/AutoInput';
import AutoTextArea from '../form/AutoTextArea'
import NumberInput from '../form/NumberInput'
import UserSelect from '../form/UserSelect';

class ObjectivePane extends PureComponent {

  constructor(props) {
    super(props);
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
    let message = `Objective "${objective.get('name')}" を削除しますか？`
    const keyResults = objective.get('keyResults')
    if (!keyResults.isEmpty()) {
      const hasChild = keyResults.some(keyResult => !keyResult.get('childObjectiveIds').isEmpty())
      message = `${hasChild ? 'Key Result に下位 Objective が紐付いています。' : 'Key Result が紐付いています。'}${message}`
    }
    confirm({
      content: message,
      onConfirm: () => removeObjective(objective.get('id')),
    });
  }

  handleDisableClick = () => {
    const { objective, disableObjective, confirm } = this.props
    const isDisabled = objective.get('disabled')
    const message = `Objective "${objective.get('name')}" を${isDisabled ? '有効化' : '無効化'}しますか？`
    const hasChild = objective.get('keyResults').some(keyResult => !keyResult.get('childObjectiveIds').isEmpty())
    confirm({
      content: hasChild ? `Key Result に下位 Objective が紐付いています。${message}` : message,
      onConfirm: () => disableObjective(objective),
    })
  }

  subProgressRateHtml(objective) {
    const progressRate = objective.get('progressRate')
    const subProgressRate = objective.get('subProgressRate')
    return (typeof subProgressRate === 'number') && progressRate !== subProgressRate && (
      <div className='flex-field__item'>
        <Popup
          trigger={<Label
            pointing='left'
            as='a'
            icon='unlinkify'
            content={`Key Result 一覧 の進捗は ${subProgressRate}% です`}
            onClick={this.handleSubProgressRateClick}
          />}
          position='bottom left'
          size='tiny'
          content='クリックすると Key Result 一覧の進捗が設定されます'
        />
      </div>
    )
  }

  parentKeyResultProgressRateHtml(parentKeyResult) {
    if (!parentKeyResult) return null;
    const progressRate = parentKeyResult.get('progressRate');
    const subProgressRate = parentKeyResult.get('subProgressRate');
    return (typeof subProgressRate === 'number') && progressRate !== subProgressRate && (
      <div className='flex-field__item--block'>
        <Label pointing='above' content={`上位 Key Result の進捗は ${subProgressRate}% から ${progressRate}% に変更されています`} />
      </div>
    );
  }

  render() {
    const objective = this.props.objective;
    if (!objective) return null;
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
          <AutoTextArea value={objective.get('description')}
                        placeholder={`Objective についての説明や補足を入力してください。\n説明を入力すると、メンバーに目指すべき方向性が伝わりやすくなります。`}
                        onCommit={this.handleDescriptionCommit}
          />
        </Form.Field>

        <Form.Group className="okr-buttons">
          <Form.Button content="削除する" onClick={this.handleRemoveClick} negative />
          <Form.Button
            icon={isDisabled ? 'undo' : 'dont'}
            content={isDisabled ? '有効化する' : '無効化する'}
            onClick={this.handleDisableClick}
            negative={!isDisabled}
          />
        </Form.Group>
      </Form>
    );
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
};

ObjectivePane.defaultProps = {
  objective: Map(),
};

export default ObjectivePane;

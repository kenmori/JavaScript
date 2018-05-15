import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Form, Button, Label, Popup, Divider } from 'semantic-ui-react';
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

  changeObjectiveOwner = ownerId => {
    const updateObjectiveOwner = () => this.props.updateObjective({ objectiveMember: { user: ownerId } })
    if (!this.props.isAdmin && this.props.isObjectiveOwner && ownerId !== this.props.loginUserId) {
      // O 責任者 (非管理者) が自分以外に変更しようとした場合
      this.props.confirm({
        content: 'Objective 責任者を他人に変更すると自分に戻すことはできません。変更しますか？',
        onConfirm: updateObjectiveOwner,
      })
    } else {
      updateObjectiveOwner()
    }
  }

  updateName = value => {
    this.props.updateObjective({ name: value });
  }

  updateDescription = value => this.props.updateObjective({ description: value })

  removeObjective = () => {
    this.props.confirm({
      content: `Objective ${this.props.objective.get('name')} を削除しますか？`,
      onConfirm: () => this.props.removeObjective(this.props.objective.get('id')),
    });
  }

  keyResultProgressRateHtml(objective) {
    const progressRate = objective.get('progressRate')
    const keyResultProgressRate = objective.get('keyResultProgressRate')
    return (typeof keyResultProgressRate === 'number') && progressRate !== keyResultProgressRate && (
      <div className='flex-field__item'>
        <Popup
          trigger={<Label
            pointing='left'
            as='a'
            icon='unlinkify'
            content={`Key Result 一覧 の進捗は ${keyResultProgressRate}% です`}
            onClick={this.handleKeyResultProgressRateClick}
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
    const childProgressRate = parentKeyResult.get('childProgressRate');
    return (typeof childProgressRate === 'number') && progressRate !== childProgressRate && (
      <div className='flex-field__item--block'>
        <Label pointing='above' content={`上位 Key Result の進捗は ${childProgressRate}% から ${progressRate}% に変更されています`} />
      </div>
    );
  }

  handleKeyResultProgressRateClick = () => this.props.updateObjective({ progressRate: null })

  handleProgressRateChange = progressRate => this.setState({ progressRate })

  handleProgressRateCommit = progressRate => this.props.updateObjective({ progressRate })

  render() {
    const objective = this.props.objective;
    if (!objective) return null;
    const { progressRate } = this.state
    return (
      <Form>
        <Form.Field>
          <AutoInput value={objective.get('name')} onCommit={this.updateName} />
        </Form.Field>
        <Form.Field className='flex-field'>
          <label>進捗</label>
          <div className="flex-field__item progress-rate">
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
          {this.keyResultProgressRateHtml(objective)}
          {this.parentKeyResultProgressRateHtml(objective.get('parentKeyResult'))}
        </Form.Field>
        <Form.Field className='flex-field'>
          <label>責任者</label>
          <div className='flex-field__item'>
          <UserSelect
            users={this.props.users}
            value={objective.get('owner').get('id')}
            onChange={this.changeObjectiveOwner}
          />
          </div>
        </Form.Field>
        <Form.Field>
          <label>説明</label>
          <AutoTextArea value={objective.get('description')}
                        placeholder={`Objective についての説明や補足を入力してください。\n説明を入力すると、メンバーに目指すべき方向性が伝わりやすくなります。`}
                        onCommit={this.updateDescription}
          />
        </Form.Field>

        <Divider hidden />

        <div>
          <Button content="削除する" onClick={this.removeObjective} as="span" negative floated='right' />
        </div>

        <Divider hidden clearing />
      </Form>
    );
  }
}

ObjectivePane.propTypes = {
  // container
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

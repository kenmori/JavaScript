import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Form, Button, Label, Divider } from 'semantic-ui-react';
import AutoInput from '../form/AutoInput';
import AutoTextArea from '../form/AutoTextArea'
import NumberInput from '../form/NumberInput'
import UserSelect from '../form/UserSelect';

class ObjectivePane extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      name: props.objective.get('name'),
      progressRate: props.objective.get('progressRate'),
    };
  }

  changeObjectiveOwner = value => {
    this.props.updateObjective({
      objectiveMember: {user: value}
    });
  }

  updateName = value => {
    this.setState({ name: value });
    this.props.updateObjective({ name: value });
  }

  updateDescription = value => this.props.updateObjective({ description: value })

  removeObjective = () => {
    this.props.confirm({
      content: `Objective ${this.props.objective.get('name')} を削除しますか？`,
      onConfirm: () => this.props.removeObjective(this.props.objective.get('id')),
    });
  }

  parentKeyResultProgressRateHtml(parentKeyResult) {
    if (!parentKeyResult) return null;
    const progressRate = parentKeyResult.get('progressRate');
    const childProgressRate = parentKeyResult.get('childProgressRate');
    return childProgressRate > 0 && progressRate !== childProgressRate && (
      <div className='flex-field__item'>
        <Label pointing='left' content={`上位 Key Result の進捗は ${childProgressRate}% から ${progressRate}% に変更されています`} />
      </div>
    );
  }

  handleProgressRateChange = progressRate => this.setState({ progressRate })

  handleProgressRateCommit = progressRate => this.props.updateObjective({ progressRate })

  render() {
    const objective = this.props.objective;
    if (!objective) return null;
    const { progressRate } = this.state
    return (
      <Form>
        <Form.Field>
          <AutoInput value={this.state.name} onCommit={this.updateName} />
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
  updateObjective: PropTypes.func.isRequired,
  removeObjective: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

ObjectivePane.defaultProps = {
  objective: Map(),
};

export default ObjectivePane;

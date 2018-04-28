import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { Form, Button, Label, Divider } from 'semantic-ui-react';
import AutoInput from '../form/AutoInput';
import AutoTextArea from '../form/AutoTextArea'
import UserSelect from '../form/UserSelect';
import OkrSelect from '../form/OkrSelect';

class ObjectivePane extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.objective.get('name'),
    };
  }

  changeObjectiveOwner(value) {
    this.updateObjective({
      objectiveMember: {user: value}
    });
  }

  updateObjective(values) {
    this.props.updateObjective({ id: this.props.objective.get('id'), ...values });
  }

  updateName(value) {
    this.setState({ name: value });
    this.updateObjective({ name: value });
  }

  updateParentKeyResultId(value) {
    this.props.updateObjective({
        id: this.props.objective.get('id'),
        parentKeyResultId: value === -1 ? null : value,
      },
    );
  }

  removeObjective(objective) {
    this.props.confirm({
      content: `Objective ${objective.get('name')} を削除しますか？`,
      onConfirm: () => this.props.removeObjective(objective.get('id')),
    });
  }

  parentKeyResultProgressRateHtml(parentKeyResult) {
    if (!parentKeyResult) return null;
    const progressRate = parentKeyResult.get('progressRate');
    const childProgressRate = parentKeyResult.get('childProgressRate');
    return progressRate !== childProgressRate && (
      <div className='flex-field__item'>
        <Label pointing='left' content={`上位 Key Result の進捗は ${childProgressRate}% から ${progressRate}% に変更されています`} />
      </div>
    );
  }

  render() {
    const objective = this.props.objective;
    if (!objective) return null;
    return (
      <Form>
        <Form.Field>
          <AutoInput value={this.state.name} onCommit={value => this.updateName(value)} />
        </Form.Field>
        <Form.Field className='flex-field'>
          <label>進捗</label>
          <div className='flex-field__item progress-rate'>{objective.get('progressRate')}%</div>
          {this.parentKeyResultProgressRateHtml(objective.get('parentKeyResult'))}
        </Form.Field>
        <Form.Field className='flex-field'>
          <label>責任者</label>
          <div className='flex-field__item'>
          <UserSelect
            users={this.props.users}
            value={objective.get('owner').get('id')}
            onChange={(value) => this.changeObjectiveOwner(value)}
          />
          </div>
        </Form.Field>
        <Form.Field>
          <label>説明</label>
          <AutoTextArea value={objective.get('description')}
                        placeholder={`Objective についての説明や補足を入力してください。\n説明を入力すると、メンバーに目指すべき方向性が伝わりやすくなります。`}
                        onCommit={value => this.updateObjective({ description: value })}
          />
        </Form.Field>
        <Form.Field>
          <label>上位 Key Result</label>
          <OkrSelect
            okrs={this.props.parentKeyResultCandidates}
            isObjective={false}
            value={objective.get('parentKeyResultId')}
            readOnly={!this.props.isObjectiveOwner}
            loading={!this.props.isFetchedKeyResultCandidates}
            onChange={value => this.updateParentKeyResultId(value)}
          />
        </Form.Field>

        <Divider hidden />

        <div>
          <Button content="削除する" onClick={() => {this.removeObjective(objective)}} as="span" negative floated='right' />
        </div>

        <Divider hidden clearing />
      </Form>
    );
  }
}

ObjectivePane.propTypes = {
  objective: PropTypes.object.isRequired,
  parentKeyResultCandidates: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  isObjectiveOwner: PropTypes.bool.isRequired,
  isFetchedKeyResultCandidates: PropTypes.bool.isRequired,
  updateObjective: PropTypes.func.isRequired,
  removeObjective: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

ObjectivePane.defaultProps = {
  objective: Map(),
};

export default ObjectivePane;

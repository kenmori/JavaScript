import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { Form, Button, Divider } from 'semantic-ui-react';
import EditableText from '../utils/EditableText';
import EditableMultiLineText from '../utils/EditableMultiLineText'
import UserSelectBox from '../UserSelectBox';
import KeyResultSelect from '../utils/KeyResultSelect';

class ObjectiveDetail extends Component {

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
      this.props.objective.get('parentObjectiveId'),
      this.props.objective.get('parentKeyResultId'),
    );
  }

  removeObjective(objective) {
    this.props.confirm({
      content: `Objective ${objective.get('name')} を削除しますか？`,
      onConfirm: () => this.props.removeObjective(objective.get('id')),
    });
  }

  render() {
    const objective = this.props.objective;
    if (!objective.size) { return null; }
    return (
      <Form>
        <Form.Field>
          <label>上位 Key Result</label>
          <KeyResultSelect
            keyResults={this.props.keyResults}
            defaultValue={objective.get('parentKeyResultId')}
            onChange={value => this.updateParentKeyResultId(value)}
          />
        </Form.Field>

        <Divider hidden />

        <Form.Field>
          <label>Objective</label>
          <EditableText value={this.state.name} saveValue={value => this.updateName(value)} />
        </Form.Field>
        <Form.Field className='flex-field'>
          <label>進捗</label>
          <div className='flex-field__item progress-rate'>{objective.get('progressRate')}%</div>
        </Form.Field>
        <Form.Field className='flex-field'>
          <label>責任者</label>
          <div className='flex-field__item'>
          <UserSelectBox
            users={this.props.users}
            defaultValue={objective.get('owner').get('id')}
            onChange={(value) => this.changeObjectiveOwner(value)}
          />
          </div>
        </Form.Field>
        <Form.Field>
          <label>説明</label>
          <EditableMultiLineText value={objective.get('description')} saveValue={(value) => this.updateObjective({ description: value })}/>
        </Form.Field>

        <Divider hidden />

        <div>
          <Button content="削除する" onClick={() => {this.removeObjective(objective)}} as="span" negative floated='right' />
        </div>
      </Form>
    );
  }
}

ObjectiveDetail.propTypes = {
  removeObjective: PropTypes.func.isRequired,
  updateObjective: PropTypes.func.isRequired,
  objective: PropTypes.object,
  users: PropTypes.object,
};

ObjectiveDetail.defaultProps = {
  objective: Map(),
};

export default ObjectiveDetail;

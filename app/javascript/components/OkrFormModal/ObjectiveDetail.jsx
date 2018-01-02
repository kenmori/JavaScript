import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { Form, Dropdown, Button } from 'semantic-ui-react';
import EditableText from '../utils/EditableText';
import EditableMultiLineText from '../utils/EditableMultiLineText'

class ObjectiveDetail extends Component {
  constructor(props) {
    super(props);
  }

  getUsersOption(users) {
    return users.map(user => {
      const id = user.get('ownerId');
      return {
        key: id,
        value: id,
        text: `${user.get('lastName')} ${user.get('firstName')}`,
      }
    }).toArray();
  }

  updateObjective(values) {
    this.props.updateObjective({ id: this.props.objective.get('id'), ...values });
  }

  removeObjective(objective) {
    if (objective.get('keyResults') && !objective.get('keyResults').isEmpty()) {
      alert('Key Result が紐付いているため削除できません。');
      return;
    }
    if (confirm(`Objective ${objective.get('name')} を削除しますか？`)) {
      this.props.removeObjective(objective.get('id'));
    }
  }

  render() {
    const objective = this.props.objective;
    if (!objective.size) { return null; }
    return (
      <Form>
        <Form.Field className='values'>
        <label>Objective 名</label>
          <EditableText value={objective.get('name')} saveValue={(value) => this.updateObjective({ name: value })}/>
        </Form.Field>
        <Form.Field className='values'>
          <label>Objective の進捗</label>
          <div className='progress-rate'>{objective.get('progressRate')}%</div>
        </Form.Field>
        <Form.Field>
          <label>責任者</label>
          <Dropdown selection options={this.getUsersOption(this.props.users)}
                      value={objective.get('ownerId')} onChange={(e, {value}) => this.updateObjective({ownerId: value})}/>
        </Form.Field>
        <Form.Field>
          <label>Objective の説明</label>
          <EditableMultiLineText value={objective.get('description')} saveValue={(value) => this.updateObjective({ description: value })}/>
        </Form.Field>

        <Form.Group>
          <Form.Field className="delete-button">
            <Button content="削除する" onClick={() => {this.removeObjective(objective)}} as="span" negative />
          </Form.Field>
        </Form.Group>
        
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

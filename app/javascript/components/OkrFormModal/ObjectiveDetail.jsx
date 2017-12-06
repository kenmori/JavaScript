import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { Form, Dropdown } from 'semantic-ui-react';
import EditableText from '../utils/EditableText';
import EditableMultiLineText from '../utils/EditableMultiLineText'

class ObjectiveDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { sliderValue: 0 };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ sliderValue: nextProps.objective.get('progressRate') });
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

  render() {
    const objective = this.props.objective;
    if (!objective.size) { return null; }
    return (
      <Form>
        <Form.Field className='values'>
          <label>進捗</label>
          <div className='progress-rate'>{this.state.sliderValue}%</div>
          <div className='slider'>
            <input type='range' min='0' max='100' value={this.state.sliderValue}
                    step='1' data-unit='%' readOnly/>
          </div>
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
        
      </Form>
    );
  }
}

ObjectiveDetail.propTypes = {
  updateObjective: PropTypes.func.isRequired,
  objective: PropTypes.object,
  users: PropTypes.object,
};

ObjectiveDetail.defaultProps = {
  objective: Map(),
};

export default ObjectiveDetail;

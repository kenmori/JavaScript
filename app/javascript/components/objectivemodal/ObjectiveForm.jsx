import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import RenderField from "../form/RenderField";
import UserSelect from '../form/UserSelect';
import RenderOkrSelect from '../form/RenderOkrSelect';
import RequiredLabel from '../form/RequiredLabel';
import { Form, TextArea, Divider } from 'semantic-ui-react';

class ObjectiveForm extends Component {

  handleObjectivesChange = objectiveId => {
    const objective = this.props.objectives.find(objective => objective.get('id') === objectiveId);
    this.props.onChange({
      description: objective.get('description'),
      ownerId: objective.get('owner').get('id'),
    });
    this.props.fieldChange('name', objective.get('name'));
  }

  render() {
    return (
      <div className="objective-modal__main">
        <Form>
          {this.props.objectives && (
            <Form.Field>
              <RequiredLabel text='既存 Objective' />
              <Field
                name='objectiveId'
                okrs={this.props.objectives}
                component={RenderOkrSelect}
                onChange={(e, newValue) => this.handleObjectivesChange(newValue)}
              />
            </Form.Field>
          )}
          {this.props.objectives && <Divider />}
          <Form.Field>
            <RequiredLabel text='上位 Key Result' required={!!this.props.objectives} />
            <Field
              name='parentKeyResultId'
              okrs={this.props.parentKeyResultCandidates}
              isObjective={false}
              disabled={this.props.hasParentKeyResult}
              loading={!this.props.isFetchedCandidates}
              component={RenderOkrSelect}
            />
          </Form.Field>
          <Form.Field>
            <RequiredLabel text='Objective' />
            <Field name='name' type='text' component={RenderField} />
          </Form.Field>
          <Form.Field>
            <label>説明</label>
            <TextArea autoHeight rows={3} onChange={(event, { value }) => this.props.onChange({ description: value })}
                      placeholder={`Objective についての説明や補足を入力してください。\n説明を入力すると、メンバーに目指すべき方向性が伝わりやすくなります。`}
                      value={this.props.description}
            />
          </Form.Field>
          <Form.Field>
            <RequiredLabel text='責任者' />
            <UserSelect
              users={this.props.users}
              value={this.props.ownerId}
              onChange={ownerId => this.props.onChange({ ownerId })}
            />
          </Form.Field>
        </Form>
      </div>
    );
  }
}

ObjectiveForm.propTypes = {
  parentKeyResultCandidates: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  objectives: PropTypes.object,
  description: PropTypes.string.isRequired,
  ownerId: PropTypes.number,
  hasParentKeyResult: PropTypes.bool.isRequired,
  isFetchedCandidates: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  fieldChange: PropTypes.func.isRequired,
};

export default ObjectiveForm;

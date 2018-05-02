import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import RenderField from "../form/RenderField";
import UserSelect from '../form/UserSelect';
import OkrSelect from '../form/OkrSelect';
import RequiredLabel from '../form/RequiredLabel';
import { Form, TextArea, Divider } from 'semantic-ui-react';

class ObjectiveForm extends Component {

  handleObjectivesChange = objectiveId => {
    const objective = this.props.objectives.find(objective => objective.get('id') === objectiveId);
    this.props.onChange({
      objectiveId,
      description: objective.get('description'),
      ownerId: objective.get('owner').get('id'),
    });
  }

  render() {
    return (
      <div className="objective-modal__main">
        <Form>
          {this.props.objectives && (
            <Form.Field>
              <RequiredLabel text='既存 Objective' />
              <OkrSelect okrs={this.props.objectives} value={this.props.objectiveId} preview={false}
                         onChange={this.handleObjectivesChange} />
            </Form.Field>
          )}
          {this.props.objectives && <Divider />}
          <Form.Field>
            <RequiredLabel text='上位 Key Result' required={!!this.props.objectives} />
            <OkrSelect
              okrs={this.props.parentKeyResultCandidates}
              isObjective={false}
              value={this.props.parentKeyResultId}
              preview={false}
              disabled={this.props.hasParentKeyResult}
              loading={!this.props.isFetchedCandidates}
              onChange={parentKeyResultId => this.props.onChange({ parentKeyResultId })}
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
  parentKeyResultId: PropTypes.number,
  objectiveId: PropTypes.number,
  ownerId: PropTypes.number,
  hasParentKeyResult: PropTypes.bool.isRequired,
  isFetchedCandidates: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ObjectiveForm;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import RenderField from "../form/RenderField";
import UserSelect from '../form/UserSelect';
import RenderOkrSelect from '../form/RenderOkrSelect';
import RequiredLabel from '../form/RequiredLabel';
import { Form, TextArea, Divider } from 'semantic-ui-react';
import { validateObjectiveName, validateParentKeyResultId, validateObjectiveId } from "../../utils/validator"

class ObjectiveForm extends Component {

  handleObjectiveIdChange = objectiveId => {
    const objective = this.props.objectives.find(objective => objective.get('id') === objectiveId);
    this.props.onChange({
      description: objective.get('description'),
      ownerId: objective.get('owner').get('id'),
    });
    this.props.fieldChange('name', objective.get('name'));
  }

  render() {
    const isNew = this.props.type === 'new'
    const isLink = this.props.type === 'link'
    const prefix = isNew ? '' : isLink ? '孤立' : '前期'
    return (
      <Form>
        {!isNew && (
          <Form.Field>
            <RequiredLabel text={`${prefix} Objective`} />
            <Field
              name='objectiveId'
              okrs={this.props.objectives}
              component={RenderOkrSelect}
              validate={[validateObjectiveId(prefix)]}
              onChange={(e, newValue) => this.handleObjectiveIdChange(newValue)}
            />
          </Form.Field>
        )}
        {!isNew && <Divider />}
        <Form.Field>
          <RequiredLabel text='上位 Key Result' required={isLink} />
          <Field
            name='parentKeyResultId'
            okrs={this.props.parentKeyResultCandidates}
            isObjective={false}
            disabled={this.props.hasParentKeyResult}
            loading={!this.props.isFetchedCandidates}
            component={RenderOkrSelect}
            validate={isLink ? [validateParentKeyResultId] : undefined}
          />
        </Form.Field>
        <Form.Field>
          <RequiredLabel text='Objective' />
          <Field
            name='name'
            type='text'
            component={RenderField}
            validate={[validateObjectiveName]}
          />
        </Form.Field>
        <Form.Field>
          <label>説明</label>
          <TextArea
            autoHeight
            rows={3}
            onChange={(e, { value }) => this.props.onChange({ description: value })}
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
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  fieldChange: PropTypes.func.isRequired,
};

export default ObjectiveForm;

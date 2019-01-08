import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Field } from "redux-form";
import { Form, TextArea, Divider } from "semantic-ui-react";
import RenderField from "../form/RenderField";
import UserSelect from "../form/UserSelect";
import RenderOkrSelect from "../form/RenderOkrSelect";
import RequiredLabel from "../form/RequiredLabel";
import {
  validateObjectiveName,
  validateParentKeyResultId,
  validateIsolatedObjectiveId,
  validatePreviousObjectiveId,
} from "../../utils/validator";

class ObjectiveForm extends PureComponent {
  handleObjectiveChange = (e, objectiveId) => {
    const objective = this.props.objectives.find(
      objective => objective.get("id") === objectiveId,
    );
    this.props.onChange({
      description: objective.get("description"),
      ownerId: objective.getIn(["owner", "id"]),
    });
    this.props.fieldChange("name", objective.get("name"));
  };

  handleDescriptionChange = (e, { value }) =>
    this.props.onChange({ description: value });

  handleOwnerChange = ownerId => this.props.onChange({ ownerId });

  render() {
    const { isLink, isCopy } = this.props;
    return (
      <Form>
        {(isLink || isCopy) && (
          <Form.Field>
            <RequiredLabel text={`${isLink ? "孤立" : "前期"} Objective`} />
            <Field
              name="objectiveId"
              okrs={this.props.objectives}
              loading={!this.props.isFetchedObjectives}
              component={RenderOkrSelect}
              validate={
                isLink
                  ? validateIsolatedObjectiveId
                  : validatePreviousObjectiveId
              }
              onChange={this.handleObjectiveChange}
            />
          </Form.Field>
        )}
        {(isLink || isCopy) && <Divider />}
        <Form.Field>
          <RequiredLabel text="上位 Key Result" required={isLink} />
          <Field
            name="parentKeyResultId"
            okrs={this.props.parentKeyResults}
            withNone={!isLink}
            disabled={this.props.hasParentKeyResult}
            loading={!this.props.isFetchedKeyResults}
            component={RenderOkrSelect}
            validate={isLink ? validateParentKeyResultId : undefined}
          />
        </Form.Field>
        <Form.Field>
          <RequiredLabel text="Objective" />
          <Field
            name="name"
            component={RenderField}
            validate={validateObjectiveName}
          />
        </Form.Field>
        <Form.Field>
          <label>説明</label>
          <TextArea
            autoHeight
            rows={3}
            onChange={this.handleDescriptionChange}
            placeholder={
              "Objective についての説明や補足を入力してください。\n説明を入力すると、メンバーに目指すべき方向性が伝わりやすくなります。\n(Markdown を記述できます)"
            }
            value={this.props.description}
          />
        </Form.Field>
        <Form.Field>
          <RequiredLabel text="責任者" />
          <UserSelect
            users={this.props.users}
            value={this.props.ownerId}
            onChange={this.handleOwnerChange}
          />
        </Form.Field>
      </Form>
    );
  }
}

ObjectiveForm.propTypes = {
  // container
  // component
  isLink: PropTypes.bool.isRequired,
  isCopy: PropTypes.bool.isRequired,
  parentKeyResults: ImmutablePropTypes.list.isRequired,
  users: ImmutablePropTypes.list.isRequired,
  objectives: ImmutablePropTypes.list,
  description: PropTypes.string.isRequired,
  ownerId: PropTypes.number,
  hasParentKeyResult: PropTypes.bool.isRequired,
  isFetchedKeyResults: PropTypes.bool.isRequired,
  isFetchedObjectives: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  fieldChange: PropTypes.func.isRequired,
};

export default ObjectiveForm;

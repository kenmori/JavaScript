import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserSelect from '../form/UserSelect';
import OkrSelect from '../form/OkrSelect';
import { Form, Input, TextArea } from 'semantic-ui-react';

class ObjectiveForm extends Component {

  render() {
    return (
      <div className="objective-modal__main">
        <Form>
          <Form.Field>
            <label>上位 Key Result</label>
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
            <label>Objective</label>
            <Input onChange={(event, { value }) => this.props.onChange({ name: value })} />
          </Form.Field>
          <Form.Field>
            <label>説明</label>
            <TextArea autoHeight rows={3} onChange={(event, { value }) => this.props.onChange({ description: value })}
                      placeholder={`Objective についての説明や補足を入力してください。\n説明を入力すると、メンバーに目指すべき方向性が伝わりやすくなります。`}
            />
          </Form.Field>
          <Form.Field>
            <label>責任者</label>
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
  parentKeyResultId: PropTypes.number,
  ownerId: PropTypes.number,
  hasParentKeyResult: PropTypes.bool.isRequired,
  isFetchedCandidates: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ObjectiveForm;

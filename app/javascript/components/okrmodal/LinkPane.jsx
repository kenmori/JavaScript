import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import OkrSelect from '../form/OkrSelect';
import OkrList from '../form/OkrList';

class LinkPane extends Component {

  updateParentKeyResultId(value) {
    this.props.updateOkr({
        id: this.props.okr.get('id'),
        parentKeyResultId: value === -1 ? null : value,
      },
    );
  }

  renderObjectiveLinks() {
    const objective = this.props.okr;
    return (
      <Form>
        <Form.Field>
          <label>上位 Key Result</label>
          <OkrSelect
            okrs={this.props.candidates}
            isObjective={false}
            value={objective.get('parentKeyResultId')}
            readOnly={!this.props.isObjectiveOwner}
            loading={!this.props.isFetchedCandidates}
            onChange={value => this.updateParentKeyResultId(value)}
          />
        </Form.Field>
      </Form>
    );
  }

  renderKeyResultLinks() {
    const keyResult = this.props.okr;
    return (
      <Form>
        <Form.Field>
          <label>紐付く Objective</label>
          <OkrSelect
            okrs={this.props.candidates}
            value={keyResult.get('objectiveId')}
            readOnly={!this.props.isObjectiveOwner}
            loading={!this.props.isFetchedCandidates}
            onChange={value => this.updateOkr({ objectiveId: value })}
          />
        </Form.Field>
        {this.childObjectivesTag(keyResult.get('childObjectives'))}
      </Form>
    );
  }

  childObjectivesTag(childObjectives) {
    if (childObjectives.isEmpty()) return null;
    return (
      <Form.Field>
        <label>下位 Objective 一覧</label>
        <OkrList okrs={childObjectives} />
      </Form.Field>
    );
  }

  render() {
    return this.props.isObjective ? this.renderObjectiveLinks() : this.renderKeyResultLinks();
  }
}

LinkPane.propTypes = {
  okr: PropTypes.object.isRequired,
  candidates: PropTypes.object.isRequired,
  isObjective: PropTypes.bool,
  isObjectiveOwner: PropTypes.bool.isRequired,
  isFetchedCandidates: PropTypes.bool.isRequired,
  updateOkr: PropTypes.func.isRequired,
};

LinkPane.defaultProps = {
  isObjective: true,
};

export default LinkPane;

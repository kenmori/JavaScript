import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import OkrSelect from '../form/OkrSelect';

class LinkPane extends Component {

  updateParentKeyResultId(value) {
    this.props.updateObjective({
        id: this.props.objective.get('id'),
        parentKeyResultId: value === -1 ? null : value,
      },
    );
  }

  render() {
    return (
      <Form>
        <Form.Field>
          <label>上位 Key Result</label>
          <OkrSelect
            okrs={this.props.parentKeyResultCandidates}
            isObjective={false}
            value={this.props.objective.get('parentKeyResultId')}
            readOnly={!this.props.isObjectiveOwner}
            loading={!this.props.isFetchedKeyResultCandidates}
            onChange={value => this.updateParentKeyResultId(value)}
          />
        </Form.Field>
      </Form>
    );
  }
}

LinkPane.propTypes = {
  objective: PropTypes.object.isRequired,
  parentKeyResultCandidates: PropTypes.object.isRequired,
  isObjectiveOwner: PropTypes.bool.isRequired,
  isFetchedKeyResultCandidates: PropTypes.bool.isRequired,
  updateObjective: PropTypes.func.isRequired,
};

export default LinkPane;

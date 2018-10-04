import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Form, Divider } from 'semantic-ui-react'
import OkrSelect from '../form/OkrSelect'
import OkrList from '../form/OkrList'

class LinkPane extends PureComponent {

  handleParentKeyResultChange = value => this.props.updateOkr({ parentKeyResultId: value === -1 ? null : value })

  handleObjectiveChange = value => this.props.updateOkr({ objectiveId: value })

  renderObjectiveLinks() {
    const objective = this.props.okr
    const parentKeyResult = objective.get('parentKeyResult')
    const childObjectives = parentKeyResult && parentKeyResult.get('childObjectives')
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
            onChange={this.handleParentKeyResultChange}
          />
        </Form.Field>
        <Divider hidden />
        {childObjectives && !childObjectives.isEmpty() && (
          <Form.Field>
            <label>上位 Key Result に紐付く下位 Objective 一覧</label>
            <OkrList okrs={childObjectives} />
          </Form.Field>
        )}
      </Form>
    )
  }

  renderKeyResultLinks() {
    const keyResult = this.props.okr
    const childObjectives = keyResult.get('childObjectives')
    return (
      <Form>
        <Form.Field>
          <label>紐付く Objective</label>
          <OkrSelect
            okrs={this.props.candidates}
            value={keyResult.get('objectiveId')}
            readOnly={!this.props.isObjectiveOwner}
            loading={!this.props.isFetchedCandidates}
            onChange={this.handleObjectiveChange}
          />
        </Form.Field>
        <Divider hidden />
        {!childObjectives.isEmpty() && (
          <Form.Field>
            <label>下位 Objective 一覧</label>
            <OkrList okrs={childObjectives} />
          </Form.Field>
        )}
      </Form>
    )
  }

  render() {
    return this.props.isObjective ? this.renderObjectiveLinks() : this.renderKeyResultLinks()
  }
}

LinkPane.propTypes = {
  // container
  // component
  okr: ImmutablePropTypes.map.isRequired,
  candidates: ImmutablePropTypes.list.isRequired,
  isObjective: PropTypes.bool,
  isObjectiveOwner: PropTypes.bool.isRequired,
  isFetchedCandidates: PropTypes.bool.isRequired,
  updateOkr: PropTypes.func.isRequired,
}

LinkPane.defaultProps = {
  isObjective: true,
}

export default LinkPane
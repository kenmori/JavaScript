import OkrPath from '../components/map/OkrPath'
import { connect } from 'react-redux'
import { isMembersObjectiveById } from '../utils/okr'

const mapStateToProps = (state, { fromKeyResultId, toObjectiveId }) => {
  const highlightedOkr = state.current.get('highlightedOkr')
  const highlightedObjectiveIds = highlightedOkr.get('objectiveIds')
  const highlightedKeyResultId = highlightedOkr.get('keyResultId')
  return {
    isHighlighted: highlightedKeyResultId === fromKeyResultId && highlightedObjectiveIds.includes(toObjectiveId),
    isMember: isMembersObjectiveById(toObjectiveId, state.entities),
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrPath)

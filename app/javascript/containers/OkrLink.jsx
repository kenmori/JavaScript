import OkrLink from '../components/map/OkrLink'
import { connect } from 'react-redux'
import currentActions from '../actions/current'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    toggleObjective: (objectiveId, keyResultIds, parentKeyResultId, isExpanded, toAncestor) => {
      dispatch(currentActions.toggleObjective(objectiveId, keyResultIds, parentKeyResultId, isExpanded, toAncestor))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrLink)

import EmptyMap from '../components/map/EmptyMap'
import { connect } from 'react-redux'
import dialogActions from '../actions/dialogs'

const mapStateToProps = state => {
  const { objectives, keyResults } = state
  return {
    isFetched: objectives.get('isFetchedObjectives') && objectives.get('isFetchedObjective') && keyResults.get('isFetchedKeyResults'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openObjectiveModal: () => {
      dispatch(dialogActions.openObjectiveModal())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmptyMap)

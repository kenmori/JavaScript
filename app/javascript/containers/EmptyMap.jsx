import EmptyMap from '../components/map/EmptyMap'
import { connect } from 'react-redux'
import dialogActions from '../actions/dialogs'

const mapStateToProps = state => {
  return {
    isFetchedObjectives: state.objectives.get('isFetchedObjectives'),
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

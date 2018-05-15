import TaskList from '../components/dashboard/TaskList'
import { connect } from 'react-redux'
import objectiveActions from '../actions/objectives'
import keyResultActions from '../actions/keyResults'
import dialogActions from '../actions/dialogs'

const mapStateToProps = (state) => {
  return {
    selectedKeyResultId: state.objectives.getIn(['selectedOkr', 'keyResultId']),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchObjective: id => {
      dispatch(objectiveActions.fetchObjective(id))
    },
    selectOkr: (objectiveId, keyResultId) => {
      dispatch(objectiveActions.selectOkr(objectiveId, keyResultId))
    },
    openObjectiveModal: parentKeyResult => {
      dispatch(dialogActions.openObjectiveModal(parentKeyResult))
    },
    processKeyResult: id => {
      dispatch(keyResultActions.processKeyResult(id))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)

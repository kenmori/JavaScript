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
    selectKeyResult: keyResult => {
      dispatch(objectiveActions.selectOkr(keyResult.get('objectiveId'), keyResult.get('id')))
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

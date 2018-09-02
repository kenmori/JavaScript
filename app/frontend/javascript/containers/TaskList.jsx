import TaskList from '../components/dashboard/TaskList'
import { connect } from 'react-redux'
import currentActions from '../actions/current'
import keyResultActions from '../actions/keyResults'
import dialogActions from '../actions/dialogs'

const mapStateToProps = (state) => {
  return {
    selectedKeyResultId: state.current.getIn(['selectedOkr', 'keyResultId']),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectKeyResult: keyResult => {
      dispatch(currentActions.selectOkr(keyResult.get('objectiveId'), keyResult.get('id')))
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

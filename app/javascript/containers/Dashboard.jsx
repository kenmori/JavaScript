import Dashboard from '../components/dashboard/Dashboard';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';
import { getObjectives, getKeyResults, getUnprocessedKeyResults, getSelectedObjective } from '../utils/selector'

const mapStateToProps = state => {
  const unprocessedKeyResults = getUnprocessedKeyResults(state)
  const isLoginUser = state.loginUser.get('id') === state.current.get('userId')
  return {
    mapObjective: getSelectedObjective(state),
    objectives: getObjectives(state),
    keyResults: getKeyResults(state),
    unprocessedKeyResults,
    isFetchedObjective: state.objectives.get('isFetchedObjective'),
    isFetchedObjectives: state.objectives.get('isFetchedObjectives'),
    isFetchedKeyResults: state.keyResults.get('isFetchedKeyResults'),
    showTask: isLoginUser && !!unprocessedKeyResults.size,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openObjectiveModal: () => {
      dispatch(dialogActions.openObjectiveModal());
    },
    openOptionModal: () => {
      dispatch(dialogActions.openOptionModal())
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

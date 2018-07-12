import Dashboard from '../components/dashboard/Dashboard';
import { connect } from 'react-redux';
import { List } from 'immutable'
import dialogActions from '../actions/dialogs';
import currentActions from '../actions/current'
import { getMyObjectives, getMyKeyResults, getTaskKeyResults, getSelectedObjective } from '../utils/selector'

const mapStateToProps = state => {
  const isLoginUser = state.loginUser.get('id') === state.current.get('userIdAtFetchedTaskKeyResults')
  return {
    mapObjective: getSelectedObjective(state),
    objectives: getMyObjectives(state),
    keyResults: getMyKeyResults(state),
    taskKeyResults: isLoginUser ? getTaskKeyResults(state) : List(),
    isFetchedObjectives: state.objectives.get('isFetchedObjectives'),
    selectedTab: state.current.get('selectedTab'),
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
    selectTab: type => {
      dispatch(currentActions.selectTab(type))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

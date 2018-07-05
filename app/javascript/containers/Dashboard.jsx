import Dashboard from '../components/dashboard/Dashboard';
import { connect } from 'react-redux';
import { List } from 'immutable'
import dialogActions from '../actions/dialogs';
import { getMyObjectives, getMyKeyResults, getTaskKeyResults, getSelectedObjective } from '../utils/selector'

const mapStateToProps = state => {
  const isLoginUser = state.loginUser.get('id') === state.current.get('userIdAtFetchedTaskKeyResults')
  return {
    mapObjective: getSelectedObjective(state),
    objectives: getMyObjectives(state),
    keyResults: getMyKeyResults(state),
    taskKeyResults: isLoginUser ? getTaskKeyResults(state) : List(),
    isFetchedObjective: state.objectives.get('isFetchedObjective'),
    isFetchedObjectives: state.objectives.get('isFetchedObjectives'),
    activeItem: state.objectives.getIn(['selectedOkr', 'type']),
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

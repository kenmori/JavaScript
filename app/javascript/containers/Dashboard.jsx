import Dashboard from '../components/dashboard/Dashboard';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';
import { getObjectives, getKeyResults, getSelectedObjective } from '../utils/selector'

const mapStateToProps = state => {
  return {
    mapObjective: getSelectedObjective(state),
    objectives: getObjectives(state),
    keyResults: getKeyResults(state),
    isFetchedObjective: state.objectives.get('isFetchedObjective'),
    isFetchedObjectives: state.objectives.get('isFetchedObjectives'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openObjectiveModal: () => {
      dispatch(dialogActions.openObjectiveModal());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

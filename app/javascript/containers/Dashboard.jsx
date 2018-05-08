import Dashboard from '../components/dashboard/Dashboard';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';
import { denormalizeDeepObjective } from "../schemas";
import { getObjectives, getKeyResults } from '../utils/selector'

const mapStateToProps = state => {
  return {
    mapObjective: denormalizeDeepObjective(state.objectives.getIn(['selectedOkr', 'objectiveId']), state.entities),
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

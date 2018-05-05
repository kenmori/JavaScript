import Dashboard from '../components/dashboard/Dashboard';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';
import { denormalizeDeepObjective, denormalizeObjectives, denormalizeKeyResults } from "../schemas";

const mapStateToProps = state => {
  return {
    mapObjective: denormalizeDeepObjective(state.objectives.getIn(['selectedOkr', 'objectiveId']), state.entities),
    objectives: denormalizeObjectives(state.objectives.get('ids'), state.entities),
    keyResults: denormalizeKeyResults(state.keyResults.get('ids'), state.entities),
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

import Dashboard from '../components/dashboard/Dashboard';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';
import { denormalizeDeepObjective, denormalizeObjectives, denormalizeKeyResults } from "../schemas";

const mapStateToProps = state => {
  return {
    okrPeriodId: state.current.get('okrPeriodId'),
    userId: state.current.get('userId'),
    mapObjective: denormalizeDeepObjective(state.objectives.getIn(['selectedOkr', 'objectiveId']), state.entities),
    objectives: denormalizeObjectives(state.objectives.get('ids'), state.entities),
    keyResults: denormalizeKeyResults(state.keyResults.get('ids'), state.entities),
    isFetchedObjective: state.objectives.get('isFetchedObjective'),
    isFetchedObjectives: state.objectives.get('isFetchedObjectives'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOkrs: (okrPeriodId, userId, withCandidates = true) => {
      dispatch(objectiveActions.fetchOkrs(okrPeriodId, userId, withCandidates));
    },
    openObjectiveModal: () => {
      dispatch(dialogActions.openObjectiveModal());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

import Dashboard from '../components/Dashboard';
import { connect } from 'react-redux';
import okrActions from '../actions/okrs';
import dialogActions from '../actions/dialogs';
import currentActions from '../actions/current';
import { denormalizeObjective, denormalizeObjectives, denormalizeKeyResults } from "../schemas";

const mapStateToProps = (state) => {
  const objectiveIds = state.objectives.get('ids');
  const fetchedObjectiveId = state.objectives.get('fetchedObjective');
  return {
    okrPeriodId: state.current.get('okrPeriodId'),
    userId: state.current.get('userId'),
    objectiveIds: objectiveIds,
    objectives: denormalizeObjectives(objectiveIds, state.entities),
    keyResults: denormalizeKeyResults(state.keyResults.get('ids'), state.entities),
    isFetched: state.objectives.get('isFetched'),
    fetchedObjectiveId: fetchedObjectiveId,
    fetchedObjective: fetchedObjectiveId && denormalizeObjective(fetchedObjectiveId, state.entities),
    entities: state.entities,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOkrs: (okrPeriodId, userId, withAllKeyResults) => {
      dispatch(okrActions.fetchOkrs(okrPeriodId, userId, withAllKeyResults));
    },
    openObjectiveFormModal: () => {
      dispatch(dialogActions.openObjectiveFormModal());
    },
    changeCurrentOkr: objectiveId => {
      dispatch(currentActions.changeCurrentOkr(objectiveId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

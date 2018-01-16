import Dashboard from '../components/Dashboard';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import keyResultActions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';
import currentActions from '../actions/current';
import { denormalizeObjective, denormalizeObjectives, denormalizeKeyResults } from "../schemas";

const mapStateToProps = (state) => {
  const objectiveIds = state.objectives.get('items');
  const denormalizedObjectives = denormalizeObjectives(objectiveIds, state.entities);
  const denormalizedKeyResults = denormalizeKeyResults(state.keyResults, state.entities);
  const fetchedObjectiveId = state.objectives.get('fetchedObjective');
  return {
    okrPeriodId: state.current.get('okrPeriodId'),
    userId: state.current.get('userId'),
    objectiveIds: objectiveIds,
    objectives: denormalizedObjectives,
    keyResults: denormalizedKeyResults,
    isFetched: state.objectives.get('isFetched'),
    fetchedObjectiveId: fetchedObjectiveId,
    fetchedObjective: denormalizeObjective(state.entities.objectives.get(fetchedObjectiveId), state.entities),
    entities: state.entities,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchObjectives: (okrPeriodId, userId) => {
      dispatch(objectiveActions.fetchObjectives(okrPeriodId, userId));
    },
    fetchKeyResults: (okrPeriodId, userId) => {
      dispatch(keyResultActions.fetchKeyResults(okrPeriodId, userId));
    },
    openObjectiveFormModal: () => {
      dispatch(dialogActions.openObjectiveFormModal());
    },
    changeCurrentObjective: id => {
      dispatch(currentActions.changeCurrentObjective(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

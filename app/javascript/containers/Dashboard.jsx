import Dashboard from '../components/Dashboard';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import keyResultActions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';
import { denormalizeObjectives, denormalizeKeyResults } from "../schemas";

const mapStateToProps = (state) => {
  const denormalizedObjectives = denormalizeObjectives(state.objectives.get('items'), state.entities);
  const denormalizedKeyResults = denormalizeKeyResults(state.keyResults, state.entities);
  return {
    okrPeriodId: state.menu.get('okrPeriodId'),
    userId: state.menu.get('userId'),
    objectives: denormalizedObjectives,
    keyResults: denormalizedKeyResults,
    isFetched: state.objectives.get('isFetched'),
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

import Dashboard from '../components/Dashboard';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import keyResultActions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';
import { denormalizeObjectives, denormalizeKeyResults } from "../schemas";

const mapStateToProps = (state) => {
  const denormalizedObjectives = denormalizeObjectives(state);
  const denormalizedKeyResults = denormalizeKeyResults(state);
  return {
    menu: state.menu,
    objectives: denormalizedObjectives,
    keyResults: denormalizedKeyResults,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchObjectives: (okrPeriodId, userId) => {
      dispatch(objectiveActions.fetchObjectives(okrPeriodId, userId));
    },
    fetchKeyResults: userId => {
      dispatch(keyResultActions.fetchKeyResults(userId));
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

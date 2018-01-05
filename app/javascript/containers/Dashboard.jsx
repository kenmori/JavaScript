import Dashboard from '../components/Dashboard';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';
import { denormalizeObjectives } from "../schemas";

const mapStateToProps = (state) => {
  const denormalizedObjectives = denormalizeObjectives(state);
  return {
    menu: state.menu,
    objectives: denormalizedObjectives,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchObjectives: (okrPeriodId, userId) => {
      dispatch(objectiveActions.fetchObjectives(okrPeriodId, userId));
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

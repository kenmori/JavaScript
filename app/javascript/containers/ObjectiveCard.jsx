import ObjectiveCard from '../components/ObjectiveCard';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    keyResults: state.keyResults,
    objectives: state.objectives
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeObjective: (id) => {
      dispatch(objectiveActions.removeObjective(id));
    },
    openObjectiveFormModal: (objective) => {
      dispatch(dialogActions.openObjectiveFormModal(objective));
    },
    openKeyResultFormModal: (objective) => {
      dispatch(dialogActions.openKeyResultFormModal(objective));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectiveCard);

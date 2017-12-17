import OkrCard from '../components/OkrMap/OkrCard';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    keyResults: state.keyResults,
    objectives: state.objectives,
    users: state.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeObjective: (id) => {
      dispatch(objectiveActions.removeObjective(id));
    },
    openOkrFormModal: (objectiveId, selectedOkr) => {
      dispatch(dialogActions.openOkrFormModal(objectiveId, selectedOkr));
    },
    openKeyResultFormModal: (objective) => {
      dispatch(dialogActions.openKeyResultFormModal(objective));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrCard);

import ObjectiveFormModal from '../components/ObjectiveFormModal';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    isOpen: state.dialogs.getIn(['objectiveForm', 'isOpen']),
    objective: state.dialogs.getIn(['objectiveForm', 'objective'])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addObjective: (objective, isOpenKeyResultFormModal = false) => {
      dispatch(objectiveActions.addObjective(objective, isOpenKeyResultFormModal));
    },
    updateObjective: (objective) => {
      dispatch(objectiveActions.updateObjective(objective));
    },

    closeModal: () => {
      dispatch(dialogActions.closeObjectiveFormModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectiveFormModal);

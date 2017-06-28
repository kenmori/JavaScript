import ObjectiveFormModal from '../components/ObjectiveFormModal';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    isOpen: state.dialogs.getIn(['objectiveForm', 'isOpen'])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addObjective: (name, isOpenKeyResultFormModal = false) => {
      dispatch(objectiveActions.addObjective(name, isOpenKeyResultFormModal));
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
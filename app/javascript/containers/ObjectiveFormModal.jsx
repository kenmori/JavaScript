import ObjectiveFormModal from '../components/ObjectiveFormModal';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    isOpen: state.dialogs.getIn(['objectiveForm', 'isOpen']),
    parentObjective: state.dialogs.getIn(['objectiveForm', 'parentObjective']),
    relatedKeyResult: state.dialogs.getIn(['objectiveForm', 'relatedKeyResult']),
    loginUser: state.loginUser,
    users: state.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addObjective: (objective) => {
      dispatch(objectiveActions.addObjective(objective));
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

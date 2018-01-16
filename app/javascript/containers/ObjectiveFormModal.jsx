import ObjectiveFormModal from '../components/ObjectiveFormModal';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  this.currentUserId = state.current.get('userId');
  return {
    isOpen: state.dialogs.getIn(['objectiveForm', 'isOpen']),
    parentObjective: state.dialogs.getIn(['objectiveForm', 'parentObjective']),
    relatedKeyResult: state.dialogs.getIn(['objectiveForm', 'relatedKeyResult']),
    loginUser: state.loginUser,
    users: state.users,
    okrPeriodId: state.current.get('okrPeriodId'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addObjective: (objective) => {
      dispatch(objectiveActions.addObjective(objective, this.currentUserId));
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

import ObjectiveFormModal from '../components/ObjectiveFormModal';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';
import confirmActions from '../actions/confirm';

const mapStateToProps = (state) => {
  this.currentUserId = state.current.get('userId');
  return {
    isOpen: state.dialogs.getIn(['objectiveForm', 'isOpen']),
    parentObjective: state.dialogs.getIn(['objectiveForm', 'parentObjective']),
    relatedKeyResult: state.dialogs.getIn(['objectiveForm', 'relatedKeyResult']),
    currentUserId: state.current.get('userId'),
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
    },
    confirm: confirmParams => {
      dispatch(confirmActions.openConfirm(confirmParams));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectiveFormModal);

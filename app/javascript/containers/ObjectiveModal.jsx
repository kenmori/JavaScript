import ObjectiveModal from '../components/okrmodal/ObjectiveModal';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';
import confirmActions from '../actions/confirm';
import { denormalizeKeyResults } from '../schemas/index';

const mapStateToProps = (state) => {
  this.currentUserId = state.current.get('userId');
  const isAdmin = state.loginUser.get('isAdmin');
  return {
    isOpen: state.dialogs.getIn(['objectiveForm', 'isOpen']),
    parentKeyResult: state.dialogs.getIn(['objectiveForm', 'parentKeyResult']),
    currentUserId: state.current.get('userId'),
    users: state.users.filter(user => !user.get('disabled')),
    okrPeriodId: state.current.get('okrPeriodId'),
    keyResults: denormalizeKeyResults(state.keyResults.get(isAdmin ? 'allIds' : 'ids'), state.entities),
    isFetchedKeyResults: state.keyResults.get(isAdmin ? 'isFetchedAllKeyResults' : 'isFetchedKeyResults'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addObjective: (objective) => {
      dispatch(objectiveActions.addObjective(objective, this.currentUserId));
    },
    closeModal: () => {
      dispatch(dialogActions.closeObjectiveModal());
    },
    confirm: confirmParams => {
      dispatch(confirmActions.openConfirm(confirmParams));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectiveModal);

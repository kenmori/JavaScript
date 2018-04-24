import ObjectiveModal from '../components/okrmodal/ObjectiveModal';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';
import { denormalizeKeyResults } from '../schemas/index';
import { getParentKeyResultCandidates } from "../utils/okr";

const mapStateToProps = (state) => {
  const parentKeyResult = state.dialogs.getIn(['objectiveForm', 'parentKeyResult']);
  const parentKeyResultCandidates = getParentKeyResultCandidates(state,
    parentKeyResult && parentKeyResult.get('id'), state.loginUser.get('id'));
  return {
    isOpen: state.dialogs.getIn(['objectiveForm', 'isOpen']),
    parentKeyResult,
    currentUserId: state.current.get('userId'),
    users: state.users.filter(user => !user.get('disabled')),
    okrPeriodId: state.current.get('okrPeriodId'),
    keyResults: denormalizeKeyResults(parentKeyResultCandidates, state.entities),
    isFetchedKeyResults: state.keyResults.get(state.loginUser.get('isAdmin') ? 'isFetchedCandidates' : 'isFetchedKeyResults'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addObjective: (objective, isNew) => {
      dispatch(objectiveActions.addObjective(objective, isNew));
    },
    closeModal: () => {
      dispatch(dialogActions.closeObjectiveModal());
    },
    confirm: params => {
      dispatch(dialogActions.openConfirmModal(params));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectiveModal);

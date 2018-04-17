import OkrModal from '../components/okrmodal/OkrModal';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import keyResultActions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';
import { denormalizeObjective, denormalizeObjectives, denormalizeKeyResults } from '../schemas/index';
import { getObjectiveCandidates, getParentKeyResultCandidates } from '../utils/okr';

const mapStateToProps = (state) => {
  this.currentUserId = state.current.get('userId');
  const okrForm = state.dialogs.get('okrForm');
  const keyResultId = okrForm.get('keyResultId');
  const objectiveId = keyResultId
    ? state.entities.keyResults.getIn([keyResultId, 'objectiveId'], null)
    : okrForm.get('objectiveId');
  const objective = objectiveId && denormalizeObjective(objectiveId, state.entities);
  const loginUserId = state.loginUser.get('id');
  const isAdmin = state.loginUser.get('isAdmin');
  const objectiveOwnerId = objective && objective.get('owner').get('id');
  const objectiveCandidates = getObjectiveCandidates(state, objectiveId, objectiveOwnerId);
  const parentKeyResultCandidates = getParentKeyResultCandidates(state,
    objective && objective.get('parentKeyResultId'), objectiveOwnerId);
  return {
    isOpen: okrForm.get('isOpen'),
    objectiveId,
    objective,
    keyResultId,
    users: state.users.filter(user => !user.get('disabled')),
    loginUserId,
    objectives: denormalizeObjectives(objectiveCandidates, state.entities),
    keyResults: denormalizeKeyResults(parentKeyResultCandidates, state.entities),
    isFetchedObjectives: state.objectives.get(isAdmin ? 'isFetchedAllObjectives' : 'isFetchedObjectives'),
    isFetchedKeyResults: state.keyResults.get(isAdmin ? 'isFetchedAllKeyResults' : 'isFetchedKeyResults'),
    removedObjectiveId: okrForm.get('removedObjectiveId'),
    removedKeyResultId: okrForm.get('removedKeyResultId'),
    isObjectiveOwner: isAdmin || objectiveOwnerId === loginUserId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openObjectiveModal: parentKeyResult => {
      dispatch(dialogActions.openObjectiveModal(parentKeyResult));
    },
    openKeyResultModal: (objective) => {
      dispatch(dialogActions.openKeyResultModal(objective));
    },
    updateObjective: objective => {
      dispatch(objectiveActions.updateObjective(objective, this.currentUserId));
    },
    updateKeyResultOrder: objective => {
      dispatch(objectiveActions.updateObjective(objective, this.currentUserId, false));
    },
    updateKeyResult: (keyResult) => {
      dispatch(keyResultActions.updateKeyResult(keyResult, this.currentUserId));
    },
    closeModal: () => {
      dispatch(dialogActions.closeOkrModal());
    },
    removeKeyResult: (id) => {
      dispatch(keyResultActions.removeKeyResult(id));
    },
    removeObjective: (id) => {
      dispatch(objectiveActions.removeObjective(id));
    },
    confirm: params => {
      dispatch(dialogActions.openConfirmModal(params));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrModal);

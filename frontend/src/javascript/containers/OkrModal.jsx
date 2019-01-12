import { connect } from "react-redux";
import OkrModal from "../components/okrmodal/OkrModal";
import objectiveActions from "../actions/objectives";
import keyResultActions from "../actions/keyResults";
import dialogActions from "../actions/dialogs";
import {
  getOkrModalObjective,
  getObjectiveCandidates,
  getParentKeyResultCandidates,
  getEnabledUsers,
} from "../utils/selector";

const mapStateToProps = state => {
  const okrForm = state.dialogs.get("okrForm");
  const objective = getOkrModalObjective(state);
  const loginUserId = state.loginUser.get("id");
  const objectiveOwnerId = objective && objective.getIn(["owner", "id"]);
  return {
    isOpen: okrForm.get("isOpen"),
    objectiveId: objective && objective.get("id"),
    objective,
    keyResultId: okrForm.get("keyResultId"),
    users: getEnabledUsers(state),
    loginUserId,
    objectiveCandidates: getObjectiveCandidates(state),
    parentKeyResultCandidates: getParentKeyResultCandidates(state),
    isFetchedObjectiveCandidates: state.objectives.get("isFetchedCandidates"),
    isFetchedKeyResultCandidates: state.keyResults.get("isFetchedCandidates"),
    removedObjectiveId: okrForm.get("removedObjectiveId"),
    removedKeyResultId: okrForm.get("removedKeyResultId"),
    isObjectiveOwner:
      state.loginUser.get("isAdmin") || objectiveOwnerId === loginUserId,
    keyResultCommentLabels: state.keyResults.get("commentLabels"),
  };
};

const mapDispatchToProps = dispatch => ({
  openObjectiveModal: parentKeyResult => {
    dispatch(dialogActions.openObjectiveModal(parentKeyResult));
  },
  openKeyResultModal: objective => {
    dispatch(dialogActions.openKeyResultModal(objective));
  },
  updateObjective: objective => {
    dispatch(objectiveActions.updateObjective(objective));
  },
  updateKeyResultOrder: (objectiveId, order) => {
    const objective = {
      id: objectiveId,
      keyResultOrder: JSON.stringify(order),
    };
    dispatch(objectiveActions.updateObjective(objective, false));
  },
  updateKeyResult: keyResult => {
    dispatch(keyResultActions.updateKeyResult(keyResult));
  },
  closeModal: () => {
    dispatch(dialogActions.closeOkrModal());
  },
  removeKeyResult: id => {
    dispatch(keyResultActions.removeKeyResult(id));
  },
  removeObjective: id => {
    dispatch(objectiveActions.removeObjective(id));
  },
  confirm: params => {
    dispatch(dialogActions.openConfirmModal(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OkrModal);

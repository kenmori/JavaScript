import { connect } from "react-redux";
import OKRModal from "../../../components/organisms/OKRModal";
import objectiveActions from "../../../actions/objectives";
import keyResultActions from "../../../actions/keyResults";
import dialogActions from "../../../actions/dialogs";
import toastActions from "../../../actions/toasts";
import {
  getOkrModalObjective,
  getObjectiveCandidates,
  getParentKeyResultCandidates,
  getEnabledUsers,
} from "../../../utils/selector";

const mapStateToProps = state => {
  const okrForm = state.dialogs.get("okrForm");
  const objective = getOkrModalObjective(state);
  const loginUserId = state.loginUser.get("id");
  const objectiveOwnerId = objective && objective.getIn(["owner", "id"]);
  return {
    loginUserId,
    users: getEnabledUsers(state),
    objectiveId: objective && objective.get("id"),
    objective,
    keyResultId: okrForm.get("keyResultId"),
    objectiveCandidates: getObjectiveCandidates(state),
    parentKeyResultCandidates: getParentKeyResultCandidates(state),
    keyResultCommentLabels: state.keyResults.get("commentLabels"),
    removedObjectiveId: okrForm.get("removedObjectiveId"),
    removedKeyResultId: okrForm.get("removedKeyResultId"),
    isOpen: okrForm.get("isOpen"),
    isAdmin: state.loginUser.get("isAdmin"),
    isFetchedObjectiveCandidates: state.objectives.get("isFetchedCandidates"),
    isFetchedKeyResultCandidates: state.keyResults.get("isFetchedCandidates"),
    isObjectiveOwner:
      state.loginUser.get("isAdmin") || objectiveOwnerId === loginUserId,
  };
};

const mapDispatchToProps = dispatch => ({
  openOKRModal: (objectiveId, keyResultId) => {
    dispatch(dialogActions.openOkrModal(objectiveId, keyResultId));
  },
  closeModal: () => {
    dispatch(dialogActions.closeOkrModal());
  },
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
  removeKeyResult: id => {
    dispatch(keyResultActions.removeKeyResult(id));
  },
  removeObjective: id => {
    dispatch(objectiveActions.removeObjective(id));
  },
  confirm: params => {
    dispatch(dialogActions.openConfirmModal(params));
  },
  disableObjective: objective => {
    dispatch(
      objectiveActions.disableObjective(
        objective.get("id"),
        !objective.get("disabled"),
      ),
    );
  },
  disableKeyResult: keyResult => {
    dispatch(
      keyResultActions.disableKeyResult(
        keyResult.get("id"),
        !keyResult.get("disabled"),
      ),
    );
  },
  fetchObjectiveHistory: id =>
    dispatch(objectiveActions.fetchObjectiveHistory(id)),
  fetchKeyResultHistory: id =>
    dispatch(keyResultActions.fetchKeyResultHistory(id)),
  showToast: message => dispatch(toastActions.showToast(message, "success")),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OKRModal);

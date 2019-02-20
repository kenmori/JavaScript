import { connect } from "react-redux";
import ObjectiveModal from "../components/objectivemodal/ObjectiveModal";
import objectiveActions from "../actions/objectives";
import dialogActions from "../actions/dialogs";
import {
  getParentKeyResults,
  getPreviousObjectives,
  getPreviousAllObjectives,
  getIsolatedObjectives,
  getEnabledUsers,
} from "../utils/selector";

const mapStateToProps = state => {
  const parentKeyResult = state.dialogs.getIn([
    "objectiveForm",
    "parentKeyResult",
  ]);
  return {
    isOpen: state.dialogs.getIn(["objectiveForm", "isOpen"]),
    parentKeyResult,
    currentUserId: state.current.get("userId"),
    isAdmin: state.loginUser.get("isAdmin"),
    loginUserId: state.loginUser.get("id"),
    users: getEnabledUsers(state),
    okrPeriodId: state.current.get("okrPeriodId"),
    parentKeyResults: getParentKeyResults(state),
    isFetchedKeyResults: state.keyResults.get("isFetchedKeyResults"),
    isolatedObjectives: getIsolatedObjectives(state),
    isFetchedObjectives: state.objectives.get("isFetchedObjectives"),
    previousObjectives: getPreviousObjectives(state),
    previousAllObjectives: getPreviousAllObjectives(state),
    isFetchedPreviousObjectives: state.objectives.get(
      "isFetchedPreviousObjectives",
    ),
  };
};

const mapDispatchToProps = dispatch => ({
  addObjective: (objective, isCopy) => {
    dispatch(objectiveActions.addObjective(objective, isCopy));
  },
  updateObjective: objective => {
    dispatch(objectiveActions.updateObjective(objective));
  },
  closeModal: () => {
    dispatch(dialogActions.closeObjectiveModal());
  },
  confirm: params => {
    dispatch(dialogActions.openConfirmModal(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ObjectiveModal);
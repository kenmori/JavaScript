import { connect } from "react-redux";
import { Map } from "immutable";
import MeetingPage from "../components/meeting/MeetingPage";
import objectiveActions from "../actions/objectives";
import keyResultActions from "../actions/keyResults";
import dialogActions from "../actions/dialogs";
import { getOkrId } from "../utils/linker";
import { getObjectiveById } from "../utils/selector";

const mapStateToProps = (state, { match: { params } }) => {
  const { objectiveId } = getOkrId(params.objectiveHash);

  return {
    objectiveId,
    objectives: state.entities.objectives,
    objective: getObjectiveById(state, objectiveId) || Map(),
    showDisabledOkrs: state.loginUser
      .get("userSetting")
      .get("showDisabledOkrs"),
    isFetchedKeyResultsCommentLabels: state.keyResults.get(
      "isFetchedKeyResultsCommentLabels",
    ),
    keyResultCommentLabels: state.keyResults.get("commentLabels"),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchObjective: objectiveId => {
    dispatch(objectiveActions.fetchObjective(objectiveId));
  },
  fetchKeyResultCommentLabels: () => {
    dispatch(keyResultActions.fetchKeyResultCommentLabels());
  },
  updateKeyResult: keyResult => {
    dispatch(keyResultActions.updateKeyResult(keyResult));
  },
  updateObjective: objective => {
    dispatch(objectiveActions.updateObjective(objective));
  },
  openCommentModal: () => {
    dispatch(dialogActions.openCommentModal());
  },
  openObjectiveCommentModal: commentLabel => {
    dispatch(dialogActions.openObjectiveCommentModal(commentLabel));
  },
  confirm: params => {
    dispatch(dialogActions.openConfirmModal(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeetingPage);

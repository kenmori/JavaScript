import { connect } from "react-redux";
import { Map } from "immutable";
import Meeting from "../components/pages/Meeting";
import currentActions from "../actions/current";
import objectiveActions from "../actions/objectives";
import keyResultActions from "../actions/keyResults";
import dialogActions from "../actions/dialogs";
import { getOkrId } from "../utils/linker";
import { getObjectiveById } from "../utils/selector";

const mapStateToProps = (state, { match: { params } }) => {
  const { objectiveId } = getOkrId(params.objectiveHash);

  return {
    userId: state.current.get("userId"),
    organizationId: state.organization.get("current").get("id"),
    organizationName: state.organization.get("current").get("name"),
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
    isFetchedMyDetail: state.current.get("isFetchedMyDetail"),
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
  openCommentModal: commentLabel => {
    dispatch(dialogActions.openCommentModal(commentLabel));
  },
  openObjectiveCommentModal: () => {
    dispatch(dialogActions.openObjectiveCommentModal());
  },
  confirm: params => {
    dispatch(dialogActions.openConfirmModal(params));
  },
  fetchMyDetail: () => {
    dispatch(currentActions.fetchMyDetail());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Meeting);

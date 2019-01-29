import { connect } from "react-redux";
import { Map, List } from "immutable";
import currentActions from "../../../actions/current";
import objectiveActions from "../../../actions/objectives";
import keyResultActions from "../../../actions/keyResults";
import dialogActions from "../../../actions/dialogs";
import { getOkrId } from "../../../utils/linker";
import { getObjectiveById } from "../../../utils/selector";
import Meeting from "./Meeting";

function selectKeyResultComments(keyResults, objectiveId, showDisabledOkrs) {
  const comments = keyResults
    .filter(
      v =>
        objectiveId === v.get("objectiveId") &&
        v.get("comments") &&
        (showDisabledOkrs || !v.get("disabled")),
    )
    .map(v => v.get("comments").map(c => c.set("KeyResult", v)))
    .toList()
    .flatten(1);

  return comments
    .filter(v => v.get("showMeetingBoard") && v.get("label") != null)
    .sort((a, b) => {
      if (a.get("updatedAt") < b.get("updatedAt")) {
        return 1;
      }
      if (a.get("updatedAt") > b.get("updatedAt")) {
        return -1;
      }
      if (a.get("updatedAt") === b.get("updatedAt")) {
        return 0;
      }
    });
}

function selectObjectiveComments(objective) {
  return objective.get("comments")
    ? objective
        .get("comments")
        .filter(v => v.get("showMeetingBoard"))
        .sort((a, b) => {
          if (a.get("updatedAt") < b.get("updatedAt")) {
            return 1;
          }
          if (a.get("updatedAt") > b.get("updatedAt")) {
            return -1;
          }
          if (a.get("updatedAt") === b.get("updatedAt")) {
            return 0;
          }
        })
    : List();
}

const mapStateToProps = (state, { match: { params } }) => {
  const { objectiveId } = getOkrId(params.objectiveHash);
  const showDisabledOkrs = state.loginUser
    .get("userSetting")
    .get("showDisabledOkrs");
  const objective = getObjectiveById(state, objectiveId) || Map();
  const keyResults = objective.get("keyResults") || List();

  return {
    userId: state.current.get("userId"),
    organizationId: state.organization.get("current").get("id"),
    organizationName: state.organization.get("current").get("name"),
    objectiveId,
    objectives: state.entities.objectives,
    objective,
    objectiveComments: selectObjectiveComments(objective),
    keyResults,
    keyResultsComments: selectKeyResultComments(
      keyResults,
      objective.get("id"),
      showDisabledOkrs,
    ),
    showDisabledOkrs,
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

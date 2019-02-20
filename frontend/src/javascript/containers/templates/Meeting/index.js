import { compose } from "redux";
import { connect } from "react-redux";
import { Map, List } from "immutable";
import objectiveActions from "../../../actions/objectives";
import keyResultActions from "../../../actions/keyResults";
import dialogActions from "../../../actions/dialogs";
import { getObjectiveById } from "../../../utils/selector";
import withInitialFetcher from "../../../hocs/withInitialFetcher";
import withUserTracker from "../../../hocs/withUserTracker";
import Meeting from "../../../components/templates/Meeting";

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
  const objectiveId = parseInt(params.objectiveId);
  const showDisabledOkrs = state.loginUser
    .get("userSetting")
    .get("showDisabledOkrs");
  const objective = getObjectiveById(state, objectiveId) || Map();
  const keyResults = objective.get("keyResults") || List();

  return {
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
  };
};

const mapDispatchToProps = dispatch => ({
  fetchObjective: objectiveId => {
    dispatch(objectiveActions.fetchObjective(objectiveId));
  },
  updateKeyResult: keyResult => {
    dispatch(keyResultActions.updateKeyResult(keyResult));
  },
  updateObjective: objective => {
    dispatch(objectiveActions.updateObjective(objective));
  },
  openCommentModal: labelName => {
    dispatch(dialogActions.openCommentModal(labelName));
  },
  openObjectiveCommentModal: () => {
    dispatch(dialogActions.openObjectiveCommentModal());
  },
  confirm: params => {
    dispatch(dialogActions.openConfirmModal(params));
  },
  openOkrModal: (objectiveId, keyResultId) => {
    dispatch(dialogActions.openOkrModal(objectiveId, keyResultId));
  },
});

export default compose(
  withInitialFetcher,
  withUserTracker,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Meeting);

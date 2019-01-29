import { connect } from "react-redux";
import { List, Map } from "immutable";
import moment from "moment";
import objectiveActions from "../../../actions/objectives";
import keyResultActions from "../../../actions/keyResults";
import currentActions from "../../../actions/current";
import dialogActions from "../../../actions/dialogs";
import {
  getOwnershipKeyResults,
  getObjectiveById,
} from "../../../utils/selector";
import { isWithinAWeek } from "../../../utils/date";
import Timeline from "./Timeline";

function selectHistories(keyResults) {
  return keyResults
    .map(e => {
      const histories = e.get("histories") || List();
      return histories.map(h => h.set("KeyResult", e));
    })
    .flatten(true)
    .sort((a, b) => {
      if (a.get("createdAt") < b.get("createdAt")) {
        return 1;
      }
      if (a.get("createdAt") > b.get("createdAt")) {
        return -1;
      }
      if (a.get("createdAt") === b.get("createdAt")) {
        return 0;
      }
    });
}

function selectNotUpdatedKeyResults(keyResults) {
  return keyResults
    .filter(e => isWithinAWeek(moment(e.get("updatedAt"))))
    .sort((a, b) => {
      if (a.get("updatedAt") < b.get("updatedAt")) {
        return -1;
      }
      if (a.get("updatedAt") > b.get("updatedAt")) {
        return 1;
      }
      if (a.get("updatedAt") === b.get("updatedAt")) {
        return 0;
      }
    });
}

function selectObjectiveComments(objective) {
  return objective.get("comments")
    ? objective.get("comments").sort((a, b) => {
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

const mapStateToProps = state => {
  const keyResults = getOwnershipKeyResults(state);
  const objectiveComment = state.dialogs.get("objectiveComment");
  const objective =
    getObjectiveById(state, objectiveComment.get("objectiveId")) || Map();

  return {
    okrPeriodId: state.current.get("okrPeriodId"),
    userId: state.current.get("userId"),
    notUpdatedKeyResults: selectNotUpdatedKeyResults(keyResults),
    keyResults,
    histories: selectHistories(keyResults),
    objectiveId: objective.get("id"),
    objectiveName: objective.get("name"),
    objectiveComments: selectObjectiveComments(objective),
    okrPeriod: state.okrPeriods.find(
      e => e.get("id") === state.current.get("okrPeriodId"),
    ),
    user: state.users.find(
      e => e.get("id") === state.current.get("userIdAtFetchedKeyResults"),
    ),
    isFetchedMyDetail: state.current.get("isFetchedMyDetail"),
    isFetchedOrganization: state.organization.get("isFetched"),
    isFetchedKeyResultsCommentLabels: state.keyResults.get(
      "isFetchedKeyResultsCommentLabels",
    ),
    isFetchedKeyResults: state.keyResults.get("isFetchedKeyResults"),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchMyDetail: () => {
    dispatch(currentActions.fetchMyDetail());
  },
  fetchKeyResultCommentLabels: () => {
    dispatch(keyResultActions.fetchKeyResultCommentLabels());
  },
  fetchOKR: (okrPeriodId, userId) => {
    dispatch(objectiveActions.fetchOkrs(okrPeriodId, userId, true));
  },
  fetchObjective: objectiveId => {
    dispatch(objectiveActions.fetchObjective(objectiveId));
  },
  fetchKeyResultHistory: ids =>
    dispatch(keyResultActions.fetchKeyResultHistory(ids)),
  openOkrModal: keyResultId =>
    dispatch(dialogActions.openOkrModal(null, keyResultId)),
  openObjectiveCommentModal: id => {
    dispatch(dialogActions.openObjectiveCommentModal(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timeline);

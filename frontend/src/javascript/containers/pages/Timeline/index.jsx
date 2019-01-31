import { connect } from "react-redux";
import { List } from "immutable";
import objectiveActions from "../../../actions/objectives";
import keyResultActions from "../../../actions/keyResults";
import currentActions from "../../../actions/current";
import dialogActions from "../../../actions/dialogs";
import { getOwnershipKeyResults } from "../../../utils/selector";
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

function sortKeyResults(keyResults) {
  return keyResults.sort((a, b) => {
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

const mapStateToProps = state => {
  const keyResults = getOwnershipKeyResults(state);

  return {
    okrPeriodId: state.current.get("okrPeriodId"),
    userId: state.current.get("userId"),
    organizationId: state.organization.get("current").get("id"),
    organizationName: state.organization.get("current").get("name"),
    sortedKeyResults: sortKeyResults(keyResults),
    keyResults,
    objectives: state.entities.objectives,
    histories: selectHistories(keyResults),
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
  fetchKeyResultHistory: ids =>
    dispatch(keyResultActions.fetchKeyResultHistory(ids)),
  openOkrModal: keyResultId =>
    dispatch(dialogActions.openOkrModal(null, keyResultId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timeline);

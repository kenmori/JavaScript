import { compose } from "redux";
import { connect } from "react-redux";
import { List } from "immutable";
import objectiveActions from "../../../actions/objectives";
import keyResultActions from "../../../actions/keyResults";
import dialogActions from "../../../actions/dialogs";
import withInitialFetcher from "../../../hocs/withInitialFetcher";
import withUserTracker from "../../../hocs/withUserTracker";
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
    sortedKeyResults: sortKeyResults(keyResults),
    objectives: state.entities.objectives,
    keyResults,
    histories: selectHistories(keyResults),
    okrPeriod: state.okrPeriods.find(
      e => e.get("id") === state.current.get("okrPeriodId"),
    ),
    user: state.users.find(
      e => e.get("id") === state.current.get("userIdAtFetchedKeyResults"),
    ),
    isFetchedMyDetail: state.current.get("isFetchedMyDetail"),
    isFetchedOrganization: state.organization.get("isFetched"),
    isFetchedKeyResults: state.keyResults.get("isFetchedKeyResults"),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchOKR: (okrPeriodId, userId) => {
    dispatch(objectiveActions.fetchOkrs(okrPeriodId, userId, true));
  },
  fetchObjectivesDetail: ids =>
    dispatch(objectiveActions.fetchObjectivesDetail(ids)),
  fetchKeyResultHistories: ids =>
    dispatch(keyResultActions.fetchKeyResultHistories(ids)),
  openOkrModal: keyResultId =>
    dispatch(dialogActions.openOkrModal(null, keyResultId)),
});

export default compose(
  withInitialFetcher,
  withUserTracker,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Timeline);

import { connect } from "react-redux";
import Timeline from "../components/pages/Timeline";
import objectiveActions from "../actions/objectives";
import keyResultActions from "../actions/keyResults";
import currentActions from "../actions/current";
import dialogActions from "../actions/dialogs";
import { getOwnershipKeyResults } from "../utils/selector";

const mapStateToProps = state => ({
  okrPeriodId: state.current.get("okrPeriodId"),
  userId: state.current.get("userId"),
  keyResults: getOwnershipKeyResults(state),
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
});

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

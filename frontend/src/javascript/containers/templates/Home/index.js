import { compose } from "redux";
import { connect } from "react-redux";
import objectiveActions from "../../../actions/objectives";
import dialogActions from "../../../actions/dialogs";
import withInitialFetcher from "../../../hocs/withInitialFetcher";
import withUserTracker from "../../../hocs/withUserTracker";
import Home from "../../../components/templates/Home";

const mapStateToProps = (state, { match: { params } }) => ({
  isModal: params.objectiveId || params.keyResultId,
  objectiveId: parseInt(params.objectiveId),
  keyResultId: parseInt(params.keyResultId),
  okrPeriodId: state.current.get("okrPeriodId"),
  userId: state.current.get("userId"),
  isFetchedCandidates: state.objectives.get("isFetchedCandidates"),
});

const mapDispatchToProps = dispatch => ({
  fetchOkrs: (okrPeriodId, userId) =>
    dispatch(objectiveActions.fetchOkrs(okrPeriodId, userId, true)),
  openOkrModal: (objectiveId, keyResultId) =>
    dispatch(dialogActions.openOkrModal(objectiveId, keyResultId)),
});

export default compose(
  withInitialFetcher,
  withUserTracker,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Home);

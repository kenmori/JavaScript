import { connect } from "react-redux";
import Fetcher from "../components/Fetcher";
import objectiveActions from "../actions/objectives";
import keyResultActions from "../actions/keyResults";
import currentActions from "../actions/current";
import dialogActions from "../actions/dialogs";
import { getOkrId } from "../utils/linker";

const mapStateToProps = state => ({
  okrPeriodId: state.current.get("okrPeriodId"),
  userId: state.current.get("userId"),
  isFetchedMyDetail: state.current.get("isFetchedMyDetail"),
  isFetchedObjectives: state.objectives.get("isFetchedObjectives"),
  isFetchedOrganization: state.organization.get("isFetched"),
  isFetchedKeyResultsCommentLabels: state.keyResults.get(
    "isFetchedKeyResultsCommentLabels",
  ),
  isOpenOkrModal: state.dialogs.getIn(["okrForm", "isOpen"]),
});

const mapDispatchToProps = dispatch => ({
  fetchOkrs: (okrPeriodId, userId) => {
    dispatch(objectiveActions.fetchOkrs(okrPeriodId, userId, true));
  },
  fetchKeyResultCommentLabels: () => {
    dispatch(keyResultActions.fetchKeyResultCommentLabels());
  },
  selectOkrPeriod: okrHash => {
    const { objectiveId, keyResultId } = getOkrId(okrHash);
    dispatch(currentActions.selectOkrPeriodByOkr(objectiveId, keyResultId));
  },
  openOkrModal: okrHash => {
    const { objectiveId, keyResultId } = getOkrId(okrHash);
    dispatch(dialogActions.openOkrModal(objectiveId, keyResultId));
  },
  closeOkrModal: () => {
    dispatch(dialogActions.closeOkrModal());
  },
  fetchMyDetail: () => {
    dispatch(currentActions.fetchMyDetail());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Fetcher);

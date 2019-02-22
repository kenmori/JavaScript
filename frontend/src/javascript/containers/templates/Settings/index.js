import { compose } from "redux";
import { connect } from "react-redux";
import objectiveActions from "../../../actions/objectives";
import withInitialFetcher from "../../../hocs/withInitialFetcher";
import withUserTracker from "../../../hocs/withUserTracker";
import history from "../../../utils/history";
import Settings from "../../../components/templates/Settings";

const mapStateToProps = (state, { match }) => ({
  name: match.params.name,
  isAdmin: state.loginUser.get("isAdmin"),
  okrPeriodId: state.current.get("okrPeriodId"),
  userId: state.current.get("userId"),
  organization: state.organization.get("current"),
});

const mapDispatchToProps = dispatch => ({
  changeURL: url => {
    history.push(url);
  },
  fetchOkrs: (okrPeriodId, userId) => {
    dispatch(objectiveActions.fetchOkrs(okrPeriodId, userId, true));
  },
});

export default compose(
  withInitialFetcher,
  withUserTracker,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Settings);

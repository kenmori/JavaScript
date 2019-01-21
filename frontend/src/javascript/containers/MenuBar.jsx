import { connect } from "react-redux";
import MenuBar from "../components/organisms/MenuBar";
import currentActions from "../actions/current";
import deviseActions from "../actions/devise";
import history from "../utils/history";
import { getEnabledUsers } from "../utils/selector";

const mapStateToProps = state => ({
  ownerId: state.organization.get("ownerId"),
  okrPeriodId: state.current.get("okrPeriodId"),
  userId: state.current.get("userId"),
  okrPeriods: state.okrPeriods,
  users: getEnabledUsers(state),
  organization: state.organization.get("current"),
  loginUser: state.loginUser,
  isFetchedMyDetail: state.current.get("isFetchedMyDetail"),
});

const mapDispatchToProps = dispatch => ({
  selectUser: userId => {
    if (location.pathname !== "/") {
      history.push("/");
    }
    dispatch(currentActions.selectUser(userId));
  },
  selectOkrPeriod: okrPeriodId => {
    if (location.pathname !== "/") {
      history.push("/");
    }
    dispatch(currentActions.selectOkrPeriod(okrPeriodId));
  },
  signOut: () => {
    dispatch(deviseActions.signOut());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuBar);

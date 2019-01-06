import { connect } from "react-redux";
import { List } from "immutable";
import Dashboard from "../components/dashboard/Dashboard";
import dialogActions from "../actions/dialogs";
import currentActions from "../actions/current";
import {
  getMyObjectives,
  getMyKeyResults,
  getTaskKeyResults,
} from "../utils/selector";

const mapStateToProps = state => {
  const isLoginUser =
    state.loginUser.get("id") ===
    state.current.get("userIdAtFetchedTaskKeyResults");
  return {
    objectives: getMyObjectives(state),
    keyResults: getMyKeyResults(state),
    taskKeyResults: isLoginUser ? getTaskKeyResults(state) : List(),
    selectedTab: state.current.get("selectedTab"),
  };
};

const mapDispatchToProps = dispatch => ({
  openObjectiveModal: () => {
    dispatch(dialogActions.openObjectiveModal());
  },
  openOptionModal: () => {
    dispatch(dialogActions.openOptionModal());
  },
  selectTab: type => {
    dispatch(currentActions.selectTab(type));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

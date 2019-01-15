import { connect } from "react-redux";
import SettingsPage from "../components/setting/SettingsPage";
import history from "../utils/history";

const mapStateToProps = (state, { match }) => ({
  userId: state.current.get("userId"),
  name: match.params.name,
  isAdmin: state.loginUser.get("isAdmin"),
});

const mapDispatchToProps = () => ({
  changeURL: url => {
    history.push(url);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsPage);

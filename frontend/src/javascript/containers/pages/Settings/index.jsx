import { connect } from "react-redux";
import history from "../../../utils/history";
import Settings from "./Settings";

const mapStateToProps = (state, { match }) => ({
  userId: state.current.get("userId"),
  organizationId: state.organization.get("current").get("id"),
  organizationName: state.organization.get("current").get("name"),
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
)(Settings);

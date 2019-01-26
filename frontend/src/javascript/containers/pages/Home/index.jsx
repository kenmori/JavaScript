import { connect } from "react-redux";
import Home from "./Home";

const mapStateToProps = (state, { match: { params } }) => ({
  okrHash: params.okrHash,
  userId: state.current.get("userId"),
  organizationId: state.organization.get("current").get("id"),
  organizationName: state.organization.get("current").get("name"),
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

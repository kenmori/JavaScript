import { connect } from "react-redux";
import Home from "../components/Home";

const mapStateToProps = (state, { match: { params } }) => ({
  okrHash: params.okrHash,
  userId: state.current.get("userId"),
  organizationId: state.organization.get("current").get("id"),
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

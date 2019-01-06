import { connect } from "react-redux";
import Home from "../components/Home";

const mapStateToProps = (state, { match: { params } }) => ({
  okrHash: params.okrHash,
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

import { connect } from "react-redux";
import Loading from "../components/util/Loading";

const mapStateToProps = state => ({
  isOpened: state.loading.get("isOpened"),
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Loading);

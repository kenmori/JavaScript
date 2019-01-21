import { connect } from "react-redux";
import KeyResultHistoryPane from "../components/okrmodal/KeyResultHistoryPane";
import keyResultActions from "../actions/keyResults";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  fetchKeyResultHistory: id =>
    dispatch(keyResultActions.fetchKeyResultHistory(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KeyResultHistoryPane);

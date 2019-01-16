import { connect } from "react-redux";
import ObjectiveHistoryPane from "../components/okrmodal/ObjectiveHistoryPane";
import objectiveActions from "../actions/objectives";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  fetchObjectiveHistory: id => dispatch(objectiveActions.fetchObjectiveHistory(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ObjectiveHistoryPane);

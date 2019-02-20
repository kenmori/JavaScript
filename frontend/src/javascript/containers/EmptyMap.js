import { connect } from "react-redux";
import EmptyMap from "../components/map/EmptyMap";
import dialogActions from "../actions/dialogs";

const mapStateToProps = state => {
  const { objectives, keyResults } = state;
  return {
    isFetched:
      objectives.get("isFetchedObjectives") &&
      objectives.get("isFetchedObjective") &&
      keyResults.get("isFetchedKeyResults"),
  };
};

const mapDispatchToProps = dispatch => ({
  openObjectiveModal: () => {
    dispatch(dialogActions.openObjectiveModal());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmptyMap);

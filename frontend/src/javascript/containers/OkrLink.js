import { connect } from "react-redux";
import OkrLink from "../components/map/OkrLink";
import currentActions from "../actions/current";

const mapStateToProps = state => {
  const highlightedOkr = state.current.get("highlightedOkr");
  return {
    highlightedObjectiveIds: highlightedOkr.get("objectiveIds"),
    highlightedKeyResultId: highlightedOkr.get("keyResultId"),
  };
};

const mapDispatchToProps = dispatch => ({
  toggleObjective: (
    objectiveId,
    keyResultIds,
    parentKeyResultId,
    isExpanded,
    toAncestor,
  ) => {
    if (isExpanded) {
      dispatch(currentActions.collapseObjective(objectiveId, toAncestor));
    } else {
      dispatch(
        currentActions.expandObjective(
          objectiveId,
          keyResultIds,
          parentKeyResultId,
          toAncestor,
        ),
      );
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OkrLink);

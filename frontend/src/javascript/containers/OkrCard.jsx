import { connect } from "react-redux";
import { List } from "immutable";
import OkrCard from "../components/map/OkrCard";
import dialogActions from "../actions/dialogs";
import currentActions from "../actions/current";

const mapStateToProps = (state, { objective }) => {
  const selectedOkr = state.current.get("selectedOkr");
  const highlightedOkr = state.current.get("highlightedOkr");
  return {
    selectedObjectiveId: selectedOkr.get("objectiveId"),
    selectedKeyResultId: selectedOkr.get("keyResultId"),
    highlightedObjectiveIds: highlightedOkr.get("objectiveIds"),
    highlightedKeyResultId: highlightedOkr.get("keyResultId"),
    visibleKeyResultIds: state.current.getIn(["mapOkr", objective.get("id")]),
    keyResults: objective.get("keyResults"),
    objectiveId: objective.get("id"),
  };
};

const mapDispatchToProps = dispatch => ({
  openOKRModal: (objectiveId, keyResultId) => {
    dispatch(dialogActions.openOkrModal(objectiveId, keyResultId));
  },
  openKeyResultModal: objective => {
    dispatch(dialogActions.openKeyResultModal(objective));
  },
  highlightObjective: objective => {
    dispatch(
      currentActions.highlightOkr(
        List.of(objective.get("id")),
        objective.get("parentKeyResultId"),
      ),
    );
  },
  highlightKeyResult: keyResult => {
    dispatch(
      currentActions.highlightOkr(
        keyResult.get("childObjectiveIds"),
        keyResult.get("id"),
      ),
    );
  },
  unhighlightOkr: () => {
    dispatch(currentActions.unhighlightOkr());
  },
  toggleKeyResult: (objective, keyResult, isExpanded) => {
    const objectiveId = objective.get("id");
    const keyResultId = keyResult.get("id");
    if (isExpanded) {
      dispatch(
        currentActions.collapseKeyResult(
          objectiveId,
          keyResultId,
          keyResult.get("childObjectiveIds"),
        ),
      );
    } else {
      dispatch(
        currentActions.expandKeyResult(
          objectiveId,
          keyResultId,
          objective.get("parentKeyResultId"),
        ),
      );
    }
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  isSelected: stateProps.objectiveId === stateProps.selectedObjectiveId,
  isHighlighted: stateProps.highlightedObjectiveIds.includes(
    stateProps.objectiveId,
  ),
  showToggle: stateProps.keyResults.some(
    keyResult => !keyResult.get("childObjectiveIds").isEmpty(),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(OkrCard);

import OkrCard from '../components/map/OkrCard';
import { connect } from 'react-redux';
import { List } from 'immutable'
import dialogActions from '../actions/dialogs';
import currentActions from '../actions/current'

const mapStateToProps = (state) => {
  const selectedOkr = state.objectives.get('selectedOkr');
  const highlightedOkr = state.current.get('highlightedOkr')
  return {
    selectedObjectiveId: selectedOkr.get('objectiveId'),
    selectedKeyResultId: selectedOkr.get('keyResultId'),
    highlightedObjectiveIds: highlightedOkr.get('objectiveIds'),
    highlightedKeyResultId: highlightedOkr.get('keyResultId'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openKeyResultModal: (objective) => {
      dispatch(dialogActions.openKeyResultModal(objective));
    },
    highlightObjective: objective => {
      dispatch(currentActions.highlightOkr(List.of(objective.get('id')), objective.get('parentKeyResultId')))
    },
    highlightKeyResult: keyResult => {
      dispatch(currentActions.highlightOkr(keyResult.get('childObjectiveIds'), keyResult.get('id')))
    },
    unhighlightOkr: () => {
      dispatch(currentActions.unhighlightOkr())
    },
    toggleKeyResult: (objective, keyResultId, isToggleOn) => {
      dispatch(currentActions.toggleKeyResult(objective.get('id'), keyResultId, objective.get('parentKeyResultId'), isToggleOn))
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrCard);

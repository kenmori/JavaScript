import OkrCard from '../components/map/OkrCard';
import { connect } from 'react-redux';
import { List } from 'immutable'
import dialogActions from '../actions/dialogs';
import currentActions from '../actions/current'

const mapStateToProps = (state, { objective }) => {
  const selectedOkr = state.current.get('selectedOkr');
  const highlightedOkr = state.current.get('highlightedOkr')
  return {
    selectedObjectiveId: selectedOkr.get('objectiveId'),
    selectedKeyResultId: selectedOkr.get('keyResultId'),
    highlightedObjectiveIds: highlightedOkr.get('objectiveIds'),
    highlightedKeyResultId: highlightedOkr.get('keyResultId'),
    visibleKeyResultIds: state.current.get('mapOkr').get(objective.get('id')),
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
    toggleKeyResult: (objective, keyResultId, isExpanded) => {
      if (isExpanded) {
        dispatch(currentActions.collapseKeyResult(objective.get('id'), keyResultId))
      } else {
        dispatch(currentActions.expandKeyResult(objective.get('id'), keyResultId, objective.get('parentKeyResultId')))
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrCard);

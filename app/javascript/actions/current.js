import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.SELECT_OKR_PERIOD]: okrPeriodId => ({ okrPeriodId }),
  [actionTypes.SELECTED_OKR_PERIOD]: okrPeriodId => ({ okrPeriodId }),
  [actionTypes.SELECT_USER]: userId => ({ userId }),
  [actionTypes.SELECTED_USER]: userId => ({ userId }),
  [actionTypes.SELECT_TAB]: type => ({ type }),
  [actionTypes.HIGHLIGHT_OKR]: (objectiveIds, keyResultId) => ({ objectiveIds, keyResultId }),
  [actionTypes.UNHIGHLIGHT_OKR]: () => {},
  [actionTypes.SELECT_MAP_OKR]: (objectiveId, keyResultIds, parentKeyResultId) => (
    { objectiveId, keyResultIds, parentKeyResultId }
  ),
  [actionTypes.CLEAR_MAP_OKR]: () => {},
  [actionTypes.TOGGLE_OBJECTIVE]: (objectiveId, keyResultIds, parentKeyResultId, isExpanded, toAncestor) => (
    { objectiveId, keyResultIds, parentKeyResultId, isExpanded, toAncestor }
  ),
  [actionTypes.TOGGLE_KEY_RESULT]: (objectiveId, keyResultId, parentKeyResultId, isExpanded) => (
    { objectiveId, keyResultId, parentKeyResultId, isExpanded }
  ),
});

export default actions;

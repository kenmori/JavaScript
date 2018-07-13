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
  [actionTypes.SELECT_MAP_OKR]: (objectiveId, keyResultIds, parentKeyResultId) => ({ objectiveId, keyResultIds, parentKeyResultId }),
});

export default actions;

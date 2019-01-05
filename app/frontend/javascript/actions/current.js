import { createActions } from "redux-actions";
import actionTypes from "../constants/actionTypes";

const actions = createActions({
  [actionTypes.FETCH_MY_DETAIL]: id => ({ id }),
  [actionTypes.FETCHED_MY_DETAIL]: user => ({ user }),
  [actionTypes.SELECT_OKR_PERIOD]: okrPeriodId => ({ okrPeriodId }),
  [actionTypes.SELECT_OKR_PERIOD_BY_OKR]: (objectiveId, keyResultId) => ({
    objectiveId,
    keyResultId,
  }),
  [actionTypes.SELECTED_OKR_PERIOD]: okrPeriodId => ({ okrPeriodId }),
  [actionTypes.SELECT_USER]: userId => ({ userId }),
  [actionTypes.SELECTED_USER]: userId => ({ userId }),
  [actionTypes.SELECT_TAB]: type => ({ type }),
  [actionTypes.HIGHLIGHT_OKR]: (objectiveIds, keyResultId) => ({
    objectiveIds,
    keyResultId,
  }),
  [actionTypes.UNHIGHLIGHT_OKR]: () => {},
  [actionTypes.SELECT_OKR]: (objectiveId, keyResultId = null) => ({
    objectiveId,
    keyResultId,
  }),
  [actionTypes.CLEAR_SELECTED_OKR]: () => {},
  [actionTypes.SELECT_MAP_OKR]: (objectiveId, keyResultId = null) => ({
    objectiveId,
    keyResultId,
  }),
  [actionTypes.SELECTED_MAP_OKR]: (
    objectiveId,
    keyResultIds,
    parentKeyResultId,
  ) => ({ objectiveId, keyResultIds, parentKeyResultId }),
  [actionTypes.CLEAR_MAP_OKR]: () => {},
  [actionTypes.EXPAND_OBJECTIVE]: (
    objectiveId,
    keyResultIds,
    parentKeyResultId,
    toAncestor,
  ) => ({
    objectiveId,
    keyResultIds,
    parentKeyResultId,
    toAncestor,
  }),
  [actionTypes.EXPANDED_OBJECTIVE]: (
    objectiveId,
    keyResultIds,
    parentKeyResultId,
    toAncestor,
  ) => ({
    objectiveId,
    keyResultIds,
    parentKeyResultId,
    toAncestor,
  }),
  [actionTypes.COLLAPSE_OBJECTIVE]: (objectiveId, toAncestor) => ({
    objectiveId,
    toAncestor,
  }),
  [actionTypes.EXPAND_KEY_RESULT]: (
    objectiveId,
    keyResultId,
    parentKeyResultId,
  ) => ({ objectiveId, keyResultId, parentKeyResultId }),
  [actionTypes.EXPANDED_KEY_RESULT]: (
    objectiveId,
    keyResultId,
    parentKeyResultId,
  ) => ({ objectiveId, keyResultId, parentKeyResultId }),
  [actionTypes.COLLAPSE_KEY_RESULT]: (
    objectiveId,
    keyResultId,
    childObjectiveIds,
  ) => ({ objectiveId, keyResultId, childObjectiveIds }),
  [actionTypes.SCROLL_TO_OBJECTIVE]: objectiveId => ({ objectiveId }),
  [actionTypes.SET_CURRENT]: user => ({ user }),
});

export default actions;

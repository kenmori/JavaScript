import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';
import { normalizeObjective, normalizeObjectives } from '../schemas/index'

const actions = createActions({
  [actionTypes.FETCH_OKRS]: (okrPeriodId, userId, isOkrPeriodChanged = false, isInitialOkrSelected = false) => (
    { okrPeriodId, userId, isOkrPeriodChanged, isInitialOkrSelected }
  ),
  [actionTypes.FETCH_OBJECTIVE]: (objectiveId, keyResultId) => ({ objectiveId, keyResultId }),
  [actionTypes.FETCH_OBJECTIVE_ASYNC]: (objectiveId, keyResultId) => ({ objectiveId, keyResultId }),
  [actionTypes.FETCHED_OBJECTIVE]: (objective) => normalizeObjective(objective),
  [actionTypes.FETCHED_OBJECTIVE_ERROR]: () => {},
  [actionTypes.FETCH_OBJECTIVES]: (okrPeriodId, userId) => ({ okrPeriodId, userId }),
  [actionTypes.FETCHED_OBJECTIVES]: objectives => normalizeObjectives(objectives),
  [actionTypes.FETCH_PREVIOUS_OBJECTIVES]: (okrPeriodId, userId) => ({ okrPeriodId, userId }),
  [actionTypes.FETCHED_PREVIOUS_OBJECTIVES]: objectives => normalizeObjectives(objectives),
  [actionTypes.FETCHED_PREVIOUS_OBJECTIVES_ERROR]: () => {},
  [actionTypes.FETCH_OBJECTIVE_CANDIDATES]: (okrPeriodId, userId) => ({ okrPeriodId, userId }),
  [actionTypes.FETCHED_OBJECTIVE_CANDIDATES]: objectives => normalizeObjectives(objectives),
  [actionTypes.ADD_OBJECTIVE]: (objective, isCopy) => ({ objective, isCopy }),
  [actionTypes.ADDED_OBJECTIVE]: (objective, currentUserId) => normalizeObjective(objective).set('currentUserId', currentUserId),
  [actionTypes.UPDATE_OBJECTIVE]: (objective, isToast = true) => ({ objective, isToast }),
  [actionTypes.UPDATED_OBJECTIVE]: (objective, currentUserId) => normalizeObjective(objective).set('currentUserId', currentUserId),
  [actionTypes.REMOVE_OBJECTIVE]: id => ({ id }),
  [actionTypes.REMOVED_OBJECTIVE]: objective => normalizeObjective(objective),
  [actionTypes.REMOVED_OBJECTIVE_KEY_RESULTS]: keyResultIds => ({ keyResultIds }),
});

export default actions;

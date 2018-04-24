import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';
import { normalizeObjective, normalizeObjectives } from '../schemas/index'

const actions = createActions({
  [actionTypes.SELECT_OKR]: (objectiveId, keyResultId = null) => ({ objectiveId, keyResultId }),
  [actionTypes.FETCH_OKRS]: (okrPeriodId, userId, withCandidates) => ({ okrPeriodId, userId, withCandidates }),
  [actionTypes.FETCH_OBJECTIVE]: (objectiveId, keyResultId) => ({ objectiveId, keyResultId }),
  [actionTypes.FETCH_OBJECTIVE_ASYNC]: (objectiveId, keyResultId) => ({ objectiveId, keyResultId }),
  [actionTypes.FETCHED_OBJECTIVE]: (objective) => normalizeObjective(objective),
  [actionTypes.FETCHED_OBJECTIVE_ERROR]: () => {},
  [actionTypes.FETCH_OBJECTIVES]: (okrPeriodId, userId) => ({ okrPeriodId, userId }),
  [actionTypes.FETCHED_OBJECTIVES]: objectives => normalizeObjectives(objectives),
  [actionTypes.FETCH_OBJECTIVE_CANDIDATES]: okrPeriodId => ({ okrPeriodId }),
  [actionTypes.FETCHED_OBJECTIVE_CANDIDATES]: objectives => ({ objectives }),
  [actionTypes.ADD_OBJECTIVE]: (objective, isNew) => ({ objective, isNew }),
  [actionTypes.ADDED_OBJECTIVE]: (objective, isNew, currentUserId) => normalizeObjective(objective).set('isNew', isNew).set('currentUserId', currentUserId),
  [actionTypes.UPDATE_OBJECTIVE]: (objective, isToast = true) => ({ objective, isToast }),
  [actionTypes.UPDATED_OBJECTIVE]: (objective, currentUserId) => normalizeObjective(objective).set('currentUserId', currentUserId),
  [actionTypes.REMOVE_OBJECTIVE]: id => ({ id }),
  [actionTypes.REMOVED_OBJECTIVE]: objective => normalizeObjective(objective),
});

export default actions;

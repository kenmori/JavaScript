import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';
import { normalize } from 'normalizr';
import { fromJS } from 'immutable';
import { objectiveListSchema } from '../schemas/index'

function normalizeObjectives(objectives, currentUserId) {
  const normalized = normalize(objectives, objectiveListSchema);
  if (currentUserId) {
    normalized.currentUserId = currentUserId;
  }
  return fromJS(normalized)
}

const actions = createActions({
  [actionTypes.FETCH_OBJECTIVES]: (okrPeriodId, userId) => ({ okrPeriodId, userId }),
  [actionTypes.FETCHED_OBJECTIVES]: (objectives) => normalizeObjectives(objectives.toJSON()),
  [actionTypes.ADD_OBJECTIVE]: (objective, currentUserId) => ({ objective, currentUserId }),
  [actionTypes.ADDED_OBJECTIVE]: (objective, currentUserId) => normalizeObjectives([objective.toJSON()], currentUserId),
  [actionTypes.UPDATE_OBJECTIVE]: (objective, currentUserId) => ({ objective, currentUserId }),
  [actionTypes.UPDATED_OBJECTIVE]: (objective, currentUserId) => normalizeObjectives([objective.toJSON()], currentUserId),
  [actionTypes.REMOVE_OBJECTIVE]: (id) => ({ id }),
  [actionTypes.REMOVED_OBJECTIVE]: (id) => ({ id }),
});

export default actions;

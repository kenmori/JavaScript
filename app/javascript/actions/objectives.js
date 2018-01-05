import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';
import { schema, normalize } from 'normalizr';
import { fromJS } from 'immutable';
import { objectiveListSchema } from '../schemas/index'

function normalizeObjectives(objectives) {
  const normalized = normalize(objectives, objectiveListSchema);
  return fromJS(normalized)
}

const actions = createActions({
  [actionTypes.FETCH_OBJECTIVES]: (okrPeriodId, userId) => ({ okrPeriodId, userId }),
  [actionTypes.FETCHED_OBJECTIVES]: (objectives) => (normalizeObjectives(objectives.toJSON())),
  [actionTypes.ADD_OBJECTIVE]: (objective) => ({ objective }),
  [actionTypes.ADDED_OBJECTIVE]: objective => (normalizeObjectives([objective.toJSON()])),
  [actionTypes.UPDATE_OBJECTIVE]: (objective) => ({ objective }),
  [actionTypes.UPDATED_OBJECTIVE]: objective => (normalizeObjectives([objective.toJSON()])),
  [actionTypes.REMOVE_OBJECTIVE]: (id) => ({ id }),
  [actionTypes.REMOVED_OBJECTIVE]: (id) => ({ id }),
});

export default actions;

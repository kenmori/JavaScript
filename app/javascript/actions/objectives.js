import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';
import { schema, normalize } from 'normalizr';
import { fromJS } from 'immutable';
import { objectiveListSchema } from '../schemas/index'
const actions = createActions({
  [actionTypes.FETCH_OBJECTIVES]: (okrPeriodId, userId) => ({ okrPeriodId, userId }),
  [actionTypes.FETCHED_OBJECTIVES]: (objectives) => {
    const normalized = normalize(objectives.toJSON(), objectiveListSchema);
    return fromJS(normalized)
  },
  [actionTypes.ADD_OBJECTIVE]: (objective) => ({ objective }),
  [actionTypes.ADDED_OBJECTIVE]: objective => {
    const normalized = normalize([objective.toJSON()], objectiveListSchema);
    return fromJS(normalized);
  },
  [actionTypes.UPDATE_OBJECTIVE]: (objective) => ({ objective }),
  [actionTypes.UPDATED_OBJECTIVE]: objective => {
    const normalized = normalize([objective.toJSON()], objectiveListSchema);
    return fromJS(normalized);
  },
  [actionTypes.REMOVE_OBJECTIVE]: (id) => ({ id }),
  [actionTypes.REMOVED_OBJECTIVE]: (id) => ({ id }),
});

export default actions;

import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

export default handleActions({
  [ActionTypes.FETCHED_ORGANIZATION]: (state, { payload }) => {
    return state.merge(payload.organization.get('okrPeriods'));
  },
  [ActionTypes.ADDED_OKR_PERIOD]: (state, { payload }) => {
    return state.push(payload.okrPeriod)
  },
  [ActionTypes.UPDATED_OKR_PERIOD]: (state, { payload }) => {
    return state.set(state.findIndex((okrPeriod) => {
      return okrPeriod.get('id') === payload.okrPeriod.get('id');
    }), payload.okrPeriod);
  },
  [ActionTypes.REMOVED_OKR_PERIOD]: (state, { payload }) => {
    return state.filter((okrPeriod) => {
      return okrPeriod.get('id') !== payload.okrPeriod.id;
    });
  },
}, fromJS([]));
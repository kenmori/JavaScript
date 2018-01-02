import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

export default handleActions({
  [ActionTypes.FETCHED_ORGANIZATION]: (state, { payload }) => {
    return state.merge(payload.organization.get('okrPeriods'));
  },
}, fromJS([]));

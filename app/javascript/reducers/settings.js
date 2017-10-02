import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

export default handleActions({
    [ActionTypes.FETCHED_OKR_SETTING]: (state, { payload }) => (
      Object.assign({}, state, { okr: payload.okrSetting })
    ),
  },
  {
    okr: undefined,
  },
);

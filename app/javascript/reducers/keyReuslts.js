import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

export default handleActions({
    [ActionTypes.FETCHED_KEY_RESULTS]: (state, { payload }) => {
      return state.merge(payload.keyResults);
    },
    [ActionTypes.ADDED_KEY_RESULT]: (state, { payload }) => (
      state.push(payload.keyResult)
    ),
    [ActionTypes.UPDATED_KEY_RESULT]: (state, { payload }) => {
      return state.set(state.findIndex((keyResult) => {
        return keyResult.get('id') === payload.keyResult.get('id');
      }), payload.keyResult);
    },
  },
  fromJS([])
)

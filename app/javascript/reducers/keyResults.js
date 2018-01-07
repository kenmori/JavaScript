import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';
import gon from "../utils/gon";

export default handleActions({
    [ActionTypes.FETCHED_KEY_RESULTS]: (state, { payload }) => {
      return fromJS(payload.get('result'));
    },
    [ActionTypes.ADDED_KEY_RESULT]: (state, { payload }) => {
      const ownerId = gon.getIn(['loginUser', 'ownerId']);
      const keyResultId = payload.get('result').first();
      const keyResult = payload.getIn(['entities', 'keyResults', keyResultId.toString()]);
      return ownerId === keyResult.get('ownerId') ? state.insert(0, keyResultId) : state;
    },
    [ActionTypes.REMOVED_KEY_RESULT]: (state, { payload }) => {
      return state.filter((keyResultId) => (keyResultId !== payload.get('id')));
    },
  },
  fromJS([]),
);

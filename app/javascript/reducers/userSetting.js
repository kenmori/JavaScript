import { fromJS, Map } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

const initialState = fromJS({
  changedEmailId: null,
});

export default handleActions({
    [ActionTypes.UPDATE_EMAIL]: (state, { payload }) => (
      state.set('changedEmailId', null)
    ),
    [ActionTypes.UPDATED_EMAIL]: (state, { payload }) => (
      state.set('changedEmailId', payload.user.get('user').get('id'))
    ),
  },
  initialState,
);

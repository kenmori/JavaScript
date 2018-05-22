import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

const initialState = fromJS({
  needLogout: false
});

export default handleActions({
  [ActionTypes.UPDATED_EMAIL]: (state, { payload }) => (
    payload.user.get('notLogout') ? state : state.set('needLogout', true)
  ),
}, initialState);

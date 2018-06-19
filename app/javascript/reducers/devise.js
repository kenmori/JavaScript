import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

const initialState = fromJS({
  needLogout: false,
  isRecovered: false,
});

export default handleActions({
  [ActionTypes.UPDATED_EMAIL]: (state, { payload }) => (
    payload.user.get('notLogout') ? state : state.set('needLogout', true)
  ),
  [ActionTypes.RECOVERED_PASSWORD]: (state, { payload }) => (
    state.set('isRecovered', payload)
  ),
}, initialState);

import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ActionTypes from '../constants/actionTypes'

const initialState = fromJS({
  id: 0,
  isAdmin: false,
  lastName: '',
  firstName: '',
  email: '',
  avatarUrl: '',
  userSetting: {}
})

export default handleActions(
  {
    [ActionTypes.UPDATED_USER]: (state, { payload }) =>
      state.get('id') === payload.user.get('id')
        ? state.merge(payload.user)
        : state,
    [ActionTypes.UPDATED_USER_SETTING]: (state, { payload }) =>
      state.set('userSetting', payload.userSetting),
    [ActionTypes.SET_CURRENT_LOGIN_USER]: (state, { payload }) =>
      state
        .set('id', payload.user.get('id'))
        .set('isAdmin', payload.user.get('isAdmin'))
        .set('lastName', payload.user.get('lastName'))
        .set('firstName', payload.user.get('firstName'))
        .set('email', payload.user.get('email'))
        .set('avatarUrl', payload.user.get('avatarUrl'))
        .set('userSetting', payload.user.get('userSetting'))
  },
  initialState
)

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
      state.set('userSetting', payload.userSetting)
  },
  initialState
)

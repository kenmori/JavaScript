import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ActionTypes from '../constants/actionTypes'

function set (state, { payload }) {
  const index = state.findIndex(user => user.get('id') === payload.user.get('id'))
  return state.set(index, payload.user)
}

export default handleActions({
    [ActionTypes.FETCHED_ORGANIZATION]: (state, { payload }) => {
      return payload.organization.get('users')
    },
    [ActionTypes.ADDED_USER]: (state, { payload }) => (
      state.push(payload.user)
    ),
    [ActionTypes.UPDATED_USER]: set,
    [ActionTypes.DISABLED_USER]: set,
  },
  fromJS([])
)

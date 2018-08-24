import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ActionTypes from '../constants/actionTypes'

const initialState = fromJS({
  isResetPasswordCompleted: false,
})

export default handleActions({
  [ActionTypes.RESET_PASSWORD_COMPLETED]: state => {
    return state.set('isResetPasswordCompleted', true)
  },
}, initialState)

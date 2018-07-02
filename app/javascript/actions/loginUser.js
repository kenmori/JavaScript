import { createActions } from 'redux-actions'
import ActionTypes from '../constants/actionTypes'

const actions = createActions({
  [ActionTypes.UPDATE_USER_SETTING]: userSetting => ({ userSetting }),
  [ActionTypes.UPDATED_USER_SETTING]: userSetting => ({ userSetting }),
})

export default actions

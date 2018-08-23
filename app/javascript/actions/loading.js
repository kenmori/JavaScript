import { createActions } from 'redux-actions'
import actionTypes from '../constants/actionTypes'

const actions = createActions({
  [actionTypes.OPEN_LOADING]: () => {},
  [actionTypes.CLOSE_LOADING]: () => {},
  [actionTypes.FORCE_CLOSE_LOADING_ON]: () => {},
  [actionTypes.FORCE_CLOSE_LOADING_OFF]: () => {},
})

export default actions

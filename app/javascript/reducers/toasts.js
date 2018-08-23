import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ActionTypes from '../constants/actionTypes'

export default handleActions({
  [ActionTypes.SHOW_TOAST]: (state, { payload }) => {
    // 同じ文言のトースト連続表示時でも props 変更イベントを飛ばすため文字列を別インスタンスにする
    // noinspection JSPrimitiveTypeWrapperUsage
    return state.set('message', new String(payload.message)).set('type', payload.type)
  },
  [ActionTypes.CLEAR_TOAST]: (state, { payload }) => {
    return state.set('message', null).set('type', null)
  },
}, fromJS({
  message: null,
  type: null,
}))

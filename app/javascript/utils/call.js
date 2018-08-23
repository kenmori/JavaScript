import { put, call, cancel } from 'redux-saga/effects'
import dialogActions from '../actions/dialogs'
import loadingActions from '../actions/loading'

function* callWithArgs(silent, ...args) {
  const response = yield call(...args)
  if (response.error && !silent) {
    const message = yield call(() => response.error.response.json().then((item) => item.error))
    yield put(loadingActions.forceCloseLoadingOn())
    yield put(loadingActions.closeLoading())
    yield put(dialogActions.openErrorModal({ message }))
    yield cancel()
  }
  return response
}

export default function* (...args) {
  return yield callWithArgs(false, ...args)
}

export function* callInSilent(...args) {
  // エラー時にエラーモーダルを表示しない (ただしローディングは必要に応じて表示される)
  return yield callWithArgs(true, ...args)
}

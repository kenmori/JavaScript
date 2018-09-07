import {
  put, call, fork, select,
} from 'redux-saga/effects'
import loadingActions from '../actions/loading'

const TIME_TO_OPEN_LOADING = 200
let connectingCounter = 0

function wait(time) {
  return () => new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

function* openLoading() {
  yield call(wait(TIME_TO_OPEN_LOADING))
  const state = yield select()
  if (!state.loading.get('isForceCloseLoading') && connectingCounter) {
    yield put(loadingActions.openLoading())
  }
}

export default function withLoading(xhrRequest) {
  return function* () {
    const state = yield select()
    if (state.loading.get('isForceCloseLoading')) {
      yield put(loadingActions.forceCloseLoadingOff())
    }

    if (++connectingCounter === 1) {
      yield fork(openLoading)
    }
    yield xhrRequest(...arguments)
    if (--connectingCounter === 0) {
      yield put(loadingActions.closeLoading())
    }
  }
}

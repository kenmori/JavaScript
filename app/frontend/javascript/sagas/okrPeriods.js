import { all, put, takeLatest } from 'redux-saga/effects'
import call from '../utils/call'
import API from '../utils/api'
import withLoading from '../utils/withLoading'
import okrPeriodActions from '../actions/okrPeriods'
import actionTypes from '../constants/actionTypes'
import toastActions from '../actions/toasts'

function* addOkrPeriod({ payload }) {
  const result = yield call(API.post, '/okr_periods', {
    okrPeriod: payload.okrPeriod
  })
  yield put(okrPeriodActions.addedOkrPeriod(result.get('okrPeriod')))
  yield put(toastActions.showToast('OKR 期間を追加しました'))
}

function* updateOkrPeriod({ payload }) {
  const result = yield call(API.put, '/okr_periods/' + payload.okrPeriod.id, {
    okrPeriod: payload.okrPeriod
  })
  yield put(okrPeriodActions.updatedOkrPeriod(result.get('okrPeriod')))
  yield put(toastActions.showToast('OKR 期間情報を更新しました'))
}

function* removeOkrPeriod({ payload }) {
  yield call(API.delete, '/okr_periods/' + payload.okrPeriod.id)
  yield put(okrPeriodActions.removedOkrPeriod({ id: payload.okrPeriod.id }))
  yield put(toastActions.showToast('OKR 期間を削除しました'))
}

export function* okrPeriodSagas() {
  yield all([
    takeLatest(actionTypes.ADD_OKR_PERIOD, withLoading(addOkrPeriod)),
    takeLatest(actionTypes.UPDATE_OKR_PERIOD, withLoading(updateOkrPeriod)),
    takeLatest(actionTypes.REMOVE_OKR_PERIOD, withLoading(removeOkrPeriod))
  ])
}

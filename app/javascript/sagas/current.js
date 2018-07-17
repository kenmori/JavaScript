import { all, put, select, takeLatest } from 'redux-saga/effects'
import currentActions from '../actions/current'
import objectiveActions from '../actions/objectives'
import ActionTypes from '../constants/actionTypes'

function* selectOkrPeriod({ payload }) {
  const { okrPeriodId } = payload
  yield put(currentActions.selectedOkrPeriod(okrPeriodId))

  const userId = yield select(state => state.current.get('userId'))
  yield put(objectiveActions.fetchOkrs(okrPeriodId, userId))
}

function* selectUser({ payload }) {
  const { userId } = payload
  yield put(currentActions.selectedUser(userId))

  const okrPeriodId = yield select(state => state.current.get('okrPeriodId'))
  yield put(objectiveActions.fetchOkrs(okrPeriodId, userId, false))
}

function* selectMapOkr({ payload }) {
  const { objectiveId, keyResultIds } = payload
  // 選択したマップ OKR の KR 一覧に未 fetch の子 O が紐付いている場合は fetch する
  const isFetched = yield select(state => keyResultIds.every(keyResultId => {
    const keyResult = state.entities.keyResults.get(keyResultId)
    return keyResult.get('childObjectiveIds').every(childObjectiveId => state.entities.objectives.has(childObjectiveId))
  }))
  if (!isFetched) {
    yield put(objectiveActions.fetchObjective(objectiveId)) // with loading
  }
}

export function* currentSagas() {
  yield all([
    takeLatest(ActionTypes.SELECT_OKR_PERIOD, selectOkrPeriod),
    takeLatest(ActionTypes.SELECT_USER, selectUser),
    takeLatest(ActionTypes.SELECT_MAP_OKR, selectMapOkr),
  ])
}

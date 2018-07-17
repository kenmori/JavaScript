import { all, put, select, takeLatest } from 'redux-saga/effects'
import currentActions from '../actions/current'
import objectiveActions from '../actions/objectives'
import ActionTypes from '../constants/actionTypes'
import { List } from 'immutable'

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
  const isFetched = yield isFetchedChildObjectives(keyResultIds)
  if (!isFetched) {
    yield put(objectiveActions.fetchObjective(objectiveId)) // with loading
  }
}

function* expandObjective({ payload }) {
  const { objectiveId, keyResultIds, toAncestor } = payload
  const isFetched = toAncestor
    ? yield select(state => state.entities.objectives.has(objectiveId))
    : yield isFetchedChildObjectives(keyResultIds)
  if (!isFetched) {
    yield put(objectiveActions.fetchObjective(objectiveId)) // with loading
  }
}

function* expandKeyResult({ payload }) {
  const { objectiveId, keyResultId } = payload
  const isFetched = yield isFetchedChildObjectives(List.of(keyResultId))
  if (!isFetched) {
    yield put(objectiveActions.fetchObjective(objectiveId)) // with loading
  }
}

// KR 一覧に未 fetch の子 O が紐付いている場合は fetch する
function* isFetchedChildObjectives(keyResultIds) {
  return yield select(state => keyResultIds.every(keyResultId => {
    const keyResult = state.entities.keyResults.get(keyResultId)
    return keyResult.get('childObjectiveIds').every(childObjectiveId => state.entities.objectives.has(childObjectiveId))
  }))
}

export function* currentSagas() {
  yield all([
    takeLatest(ActionTypes.SELECT_OKR_PERIOD, selectOkrPeriod),
    takeLatest(ActionTypes.SELECT_USER, selectUser),
    takeLatest(ActionTypes.SELECT_MAP_OKR, selectMapOkr),
    takeLatest(ActionTypes.EXPAND_OBJECTIVE, expandObjective),
    takeLatest(ActionTypes.EXPAND_KEY_RESULT, expandKeyResult),
  ])
}

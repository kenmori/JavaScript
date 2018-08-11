import { all, put, select, take, takeLatest } from 'redux-saga/effects'
import currentActions from '../actions/current'
import objectiveActions from '../actions/objectives'
import ActionTypes from '../constants/actionTypes'
import { List } from 'immutable'
import { getEnabledObjective } from '../utils/okr'

function* selectOkrPeriod({ payload }) {
  const { okrPeriodId } = payload
  yield put(currentActions.selectedOkrPeriod(okrPeriodId))

  const userId = yield select(state => state.current.get('userId'))
  yield put(objectiveActions.fetchOkrs(okrPeriodId, userId, true))
}

function* selectOkrPeriodByOkr({ payload: { objectiveId, keyResultId } }) {
  if (!objectiveId) {
    objectiveId = yield select(state => state.entities.keyResults.getIn([keyResultId, 'objectiveId']))
  }
  const okrPeriodId = yield select(state => state.entities.objectives.get(objectiveId).get('okrPeriodId'))
  yield put(currentActions.selectedOkrPeriod(okrPeriodId))

  yield put(currentActions.selectOkr(objectiveId, keyResultId))

  const userId = yield select(state => state.current.get('userId'))
  yield put(objectiveActions.fetchOkrs(okrPeriodId, userId, true, true))
}

function* selectUser({ payload }) {
  const { userId } = payload
  yield put(currentActions.selectedUser(userId))

  const okrPeriodId = yield select(state => state.current.get('okrPeriodId'))
  yield put(objectiveActions.fetchOkrs(okrPeriodId, userId))
}

function* selectOkr({ payload }) {
  const { objectiveId, keyResultId } = payload
  yield put(currentActions.selectMapOkr(objectiveId, keyResultId))

  yield take(ActionTypes.SELECTED_MAP_OKR)
  const isRoot = yield select(state => state.current.get('mapOkr').keySeq().first() === objectiveId)
  if (!isRoot) {
    yield put(currentActions.scrollToObjective(objectiveId)) // ルート O でない場合はページスクロールする
  }
}

function* clearSelectedOkr({ payload }) {
  yield put(currentActions.clearMapOkr())
}

function* selectMapOkr({ payload }) {
  const { objectiveId, keyResultId } = payload
  let isFetched = yield isFetchedObjective(objectiveId)
  if (!isFetched) {
    yield put(objectiveActions.fetchObjective(objectiveId)) // with loading
    yield take(ActionTypes.FETCHED_OBJECTIVE)
  }

  const objective = yield select(state => {
    const showDisabledOkrs = state.loginUser.getIn(['userSetting', 'showDisabledOkrs'])
    return getEnabledObjective(objectiveId, showDisabledOkrs, state.entities)
  })
  const keyResultIds = keyResultId ? List.of(keyResultId) : objective.get('keyResultIds')
  yield put(currentActions.selectedMapOkr(objectiveId, keyResultIds, objective.get('parentKeyResultId')))

  if (isFetched) {
    // O が fetch 済みで fetchObjective を呼び出していない場合は子 O も fetch 済みかチェックする
    isFetched = yield isFetchedChildObjectives(keyResultIds)
    if (!isFetched) {
      yield put(objectiveActions.fetchObjective(objectiveId)) // with loading
    }
  }
}

function* expandObjective({ payload }) {
  const { objectiveId, keyResultIds, parentKeyResultId, toAncestor } = payload
  const isFetched = yield (toAncestor ? isFetchedObjective(objectiveId) : isFetchedChildObjectives(keyResultIds))
  if (!isFetched) {
    yield put(objectiveActions.fetchObjective(objectiveId)) // with loading
    yield take(ActionTypes.FETCHED_OBJECTIVE)
  }
  yield put(currentActions.expandedObjective(objectiveId, keyResultIds, parentKeyResultId, toAncestor))

  if (!toAncestor) {
    const childObjectiveId = yield getChildObjectiveId(keyResultIds.first())
    yield put(currentActions.scrollToObjective(childObjectiveId))
  }
}

function* expandKeyResult({ payload }) {
  const { objectiveId, keyResultId, parentKeyResultId } = payload
  const isFetched = yield isFetchedChildObjectives(List.of(keyResultId))
  if (!isFetched) {
    yield put(objectiveActions.fetchObjective(objectiveId)) // with loading
    yield take(ActionTypes.FETCHED_OBJECTIVE)
  }
  yield put(currentActions.expandedKeyResult(objectiveId, keyResultId, parentKeyResultId))

  const childObjectiveId = yield getChildObjectiveId(keyResultId)
  yield put(currentActions.scrollToObjective(childObjectiveId))
}

function* isFetchedObjective(objectiveId) {
  return yield select(state => state.entities.objectives.has(objectiveId))
}

// KR 一覧に紐付いている子 O が全て fetch 済みの場合は true
function* isFetchedChildObjectives(keyResultIds) {
  return yield select(state => keyResultIds.every(keyResultId => {
    const keyResult = state.entities.keyResults.get(keyResultId)
    return keyResult.get('childObjectiveIds').every(childObjectiveId => state.entities.objectives.has(childObjectiveId))
  }))
}

function* getChildObjectiveId(keyResultId) {
  return yield select(state => {
    const keyResult = state.entities.keyResults.get(keyResultId)
    return keyResult.get('childObjectiveIds').first()
  })
}

export function* currentSagas() {
  yield all([
    takeLatest(ActionTypes.SELECT_OKR_PERIOD, selectOkrPeriod),
    takeLatest(ActionTypes.SELECT_OKR_PERIOD_BY_OKR, selectOkrPeriodByOkr),
    takeLatest(ActionTypes.SELECT_USER, selectUser),
    takeLatest(ActionTypes.SELECT_OKR, selectOkr),
    takeLatest(ActionTypes.CLEAR_SELECTED_OKR, clearSelectedOkr),
    takeLatest(ActionTypes.SELECT_MAP_OKR, selectMapOkr),
    takeLatest(ActionTypes.EXPAND_OBJECTIVE, expandObjective),
    takeLatest(ActionTypes.EXPAND_KEY_RESULT, expandKeyResult),
  ])
}

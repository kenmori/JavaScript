import { all, put, take, takeLatest, select } from 'redux-saga/effects';
import call, { callInSilent } from '../utils/call';
import API from '../utils/api';
import objectiveActions from '../actions/objectives';
import keyResultActions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';
import currentActions from '../actions/current'
import actionTypes from '../constants/actionTypes';
import withLoading from '../utils/withLoading';
import toastActions from '../actions/toasts';
import { isMyChildObjectiveById, isMembersKeyResultById } from '../utils/okr'
import { OkrTypes } from '../utils/okr'
import { List } from 'immutable'

function* selectOkr({ payload }) {
  const { objectiveId, keyResultId } = payload
  const objective = yield select(state => state.entities.objectives.get(objectiveId))
  if (!objective) {
    yield put(objectiveActions.fetchObjective(objectiveId)) // with loading
    yield take(actionTypes.FETCHED_OBJECTIVE)
  }
  yield put(objectiveActions.selectedOkr(objectiveId, keyResultId))
  const keyResultIds = keyResultId ? List.of(keyResultId) : objective.get('keyResultIds')
  yield put(currentActions.selectMapOkr(objectiveId, keyResultIds))
}

function* fetchOkrs({ payload }) {
  let isInitialOkrSelected = false
  const loginUserId = yield select(state => state.loginUser.get('id'))
  if (payload.isOkrPeriodChanged) {
    yield put(keyResultActions.fetchTaskKeyResults(payload.okrPeriodId, loginUserId)) // with loading
    yield take(actionTypes.FETCHED_TASK_KEY_RESULTS)
  }
  if (loginUserId === payload.userId) {
    isInitialOkrSelected = yield selectInitialTaskKeyResult()
  }
  yield put(objectiveActions.fetchObjectives(payload.okrPeriodId, payload.userId)); // with loading
  yield take(actionTypes.FETCHED_OBJECTIVES)
  if (!isInitialOkrSelected) {
    isInitialOkrSelected = yield selectInitialObjective()
  }
  yield put(keyResultActions.fetchKeyResults(payload.okrPeriodId, payload.userId)); // without loading
  yield take(actionTypes.FETCHED_KEY_RESULTS)
  if (!isInitialOkrSelected) {
    yield selectInitialKeyResult()
  }
  if (payload.isOkrPeriodChanged) {
    // 前期 OKR の fetch
    const okrPeriods = yield select(state => state.okrPeriods)
    const okrPeriodIndex = okrPeriods.findIndex(okrPeriod => okrPeriod.get('id') === payload.okrPeriodId)
    if (okrPeriodIndex > 0) {
      const previousOkrPeriodId = okrPeriods.get(okrPeriodIndex - 1).get('id')
      yield put(objectiveActions.fetchPreviousObjectives(previousOkrPeriodId, loginUserId)); // without loading
      yield take(actionTypes.FETCHED_PREVIOUS_OBJECTIVES)
    } else {
      yield put(objectiveActions.fetchedPreviousObjectivesError());
    }
    // 上位 KR や紐付く Objective の紐付け変更用に O/KR 候補一覧を取得する
    const isAdmin = yield select(state => state.loginUser.get('isAdmin'))
    const userId = isAdmin ? undefined : loginUserId;
    // Objective に紐付く上位 KR の変更のほうがよく行われるとの推測から先に KR を fetch する
    yield put(keyResultActions.fetchKeyResultCandidates(payload.okrPeriodId, userId)); // without loading
    yield take(actionTypes.FETCHED_KEY_RESULT_CANDIDATES)
    yield put(objectiveActions.fetchObjectiveCandidates(payload.okrPeriodId, userId)); // without loading
    yield take(actionTypes.FETCHED_OBJECTIVE_CANDIDATES)
  }
}

function* selectInitialTaskKeyResult() {
  return yield selectInitialKeyResult('taskIds', OkrTypes.TASK, false)
}

function* selectInitialObjective() {
  const objectiveId = yield select(state => {
    const objectives = state.objectives.get('ids')
    const ownerId = state.current.get('userId')
    const showMyChildObjectives = state.loginUser.getIn(['userSetting', 'showMyChildObjectives'])
    return showMyChildObjectives ? objectives.first()
      : objectives.find(objectiveId => !isMyChildObjectiveById(objectiveId, ownerId, state.entities))
  })
  if (objectiveId) {
    yield put(objectiveActions.selectOkr(objectiveId, null))
    yield take(actionTypes.SELECTED_OKR)
    yield put(currentActions.selectTab(OkrTypes.OBJECTIVE))
    return true
  }
  return false
}

function* selectInitialKeyResult(ids = 'ids', type = OkrTypes.KEY_RESULT, selectAnyway = true) {
  const keyResultId = yield select(state => {
    const keyResults = state.keyResults.get(ids)
    const ownerId = state.current.get('userId')
    const showMembersKeyResults = state.loginUser.getIn(['userSetting', 'showMembersKeyResults'])
    return showMembersKeyResults ? keyResults.first()
      : keyResults.find(keyResultId => !isMembersKeyResultById(keyResultId, ownerId, state.entities))
  })
  if (keyResultId) {
    const keyResult = yield select(state => state.entities.keyResults.get(keyResultId))
    yield put(objectiveActions.selectOkr(keyResult.get('objectiveId'), keyResultId))
    yield take(actionTypes.SELECTED_OKR)
    yield put(currentActions.selectTab(type))
    return true
  } else if (selectAnyway) {
    yield put(objectiveActions.selectedOkr(null, null))
    yield put(currentActions.selectTab(OkrTypes.OBJECTIVE))
    return true
  }
  return false
}

function* fetchObjective({ payload }) {
  const result = yield callFetchObjective(payload.objectiveId, payload.keyResultId)
  if (result.error) {
    yield put(objectiveActions.fetchedObjectiveError());
  } else {
    yield put(objectiveActions.fetchedObjective(result.get('objective')));
  }
}

function* fetchObjectiveAsync({ payload }) {
  const result = yield callFetchObjective(payload.objectiveId, payload.keyResultId)
  yield put(objectiveActions.fetchedObjective(result.get('objective')))
}

function* callFetchObjective(objectiveId, keyResultId) {
  return yield callInSilent(API.get, objectiveId ? `/objectives/${objectiveId}` : `/key_results/${keyResultId}/objective`)
}

function* fetchObjectives({ payload }) {
  const result = yield callFetchObjectives(payload.okrPeriodId, payload.userId)
  yield put(objectiveActions.fetchedObjectives(result.get('objectives')))
}

function* fetchPreviousObjectives({ payload }) {
  const result = yield callFetchObjectives(payload.okrPeriodId, payload.userId)
  yield put(objectiveActions.fetchedPreviousObjectives(result.get('objectives')))
}

function* callFetchObjectives(okrPeriodId, userId) {
  return yield call(API.get, '/objectives', { okrPeriodId, userId })
}

function* fetchObjectiveCandidates({ payload }) {
  const result = yield call(API.get, '/objectives/candidates', { okrPeriodId: payload.okrPeriodId, userId: payload.userId });
  yield put(objectiveActions.fetchedObjectiveCandidates(result));
}

function* addObjective({ payload }) {
  const url = payload.isCopy ? `/objectives/${payload.objective.id}/copy` : '/objectives'
  const result = yield call(API.post, url, { objective: payload.objective })
  const currentUserId = yield select(state => state.current.get('userId'));
  yield put(objectiveActions.addedObjective(result.get('objective'), payload.viaHome, currentUserId));
  yield put(dialogActions.closeObjectiveModal());
  yield put(toastActions.showToast('Objective を作成しました'));
}

function* updateObjective({payload}) {
  const result = yield call(API.put, '/objectives/' + payload.objective.id, payload);
  const currentUserId = yield select(state => state.current.get('userId'));
  yield put(objectiveActions.updatedObjective(result.get('objective'), currentUserId));
  const isOpenObjectiveModal = yield select(state => state.dialogs.getIn(['objectiveForm', 'isOpen']));
  if (isOpenObjectiveModal) {
    yield put(dialogActions.closeObjectiveModal());
  }
  if (payload.isToast) {
    yield put(toastActions.showToast('Objective を更新しました'));
  }
}

function* removeObjective({payload}) {
  const result = yield call(API.delete, '/objectives/' + payload.id);
  yield put(objectiveActions.removedObjective(result.get('objective')));
  yield put(toastActions.showToast('Objective を削除しました'));
}

export function *objectiveSagas() {
  yield all([
    takeLatest(actionTypes.SELECT_OKR, selectOkr),
    takeLatest(actionTypes.FETCH_OKRS, fetchOkrs),
    takeLatest(actionTypes.FETCH_OBJECTIVE, withLoading(fetchObjective)),
    takeLatest(actionTypes.FETCH_OBJECTIVE_ASYNC, fetchObjectiveAsync),
    takeLatest(actionTypes.FETCH_OBJECTIVES, withLoading(fetchObjectives)),
    takeLatest(actionTypes.FETCH_PREVIOUS_OBJECTIVES, fetchPreviousObjectives),
    takeLatest(actionTypes.FETCH_OBJECTIVE_CANDIDATES, fetchObjectiveCandidates),
    takeLatest(actionTypes.ADD_OBJECTIVE, withLoading(addObjective)),
    takeLatest(actionTypes.UPDATE_OBJECTIVE, withLoading(updateObjective)),
    takeLatest(actionTypes.REMOVE_OBJECTIVE, withLoading(removeObjective)),
  ]);
}

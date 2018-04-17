import { all, put, take, takeLatest } from 'redux-saga/effects';
import call, { callInSilent } from '../utils/call';
import API from '../utils/api';
import objectiveActions from '../actions/objectives';
import keyResultActions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';
import actionTypes from '../constants/actionTypes';
import withLoading from '../utils/withLoading';
import toastActions from '../actions/toasts';

function* fetchOkrs({ payload }) {
  yield put(objectiveActions.fetchObjectives(payload.okrPeriodId, payload.userId)); // with loading
  yield take(actionTypes.FETCHED_OBJECTIVES)
  yield put(keyResultActions.fetchKeyResults(payload.okrPeriodId, payload.userId)); // without loading
  yield take(actionTypes.FETCHED_KEY_RESULTS)
  if (payload.withAll) {
    yield put(keyResultActions.fetchAllKeyResults(payload.okrPeriodId)); // without loading
    yield take(actionTypes.FETCHED_ALL_KEY_RESULTS)
    yield put(objectiveActions.fetchAllObjectives(payload.okrPeriodId)); // without loading
    yield take(actionTypes.FETCHED_ALL_OBJECTIVES)
  }
}

function* fetchObjective({ payload }) {
  const { objectiveId, keyResultId } = payload;
  if (!objectiveId && !keyResultId) {
    yield put(objectiveActions.fetchedObjectiveError());
    return;
  }
  const result = yield callInSilent(API.get, objectiveId ? `/objectives/${objectiveId}` : `/key_results/${keyResultId}/objective`);
  if (result.error) {
    yield put(objectiveActions.fetchedObjectiveError());
  } else {
    yield put(objectiveActions.fetchedObjective(result.get('objective')));
  }
}

function* fetchObjectives({payload}) {
  const result = yield call(API.get, '/objectives', { okrPeriodId: payload.okrPeriodId, userId: payload.userId });
  yield put(objectiveActions.fetchedObjectives(result.get('objectives')));
}

function* fetchAllObjectives({ payload }) {
  const result = yield call(API.get, '/objectives', { okrPeriodId: payload.okrPeriodId });
  yield put(objectiveActions.fetchedAllObjectives(result.get('objectives')));
}

function* addObjective({ payload }) {
  const result = yield call(API.post, '/objectives', { objective: payload.objective });
  yield put(objectiveActions.addedObjective(result.get('objective'), payload.currentUserId));
  yield put(dialogActions.closeObjectiveModal());
  yield put(toastActions.showToast('Objective を作成しました'));
}

function* updateObjective({payload}) {
  const result = yield call(API.put, '/objectives/' + payload.objective.id, payload);
  yield put(objectiveActions.updatedObjective(result.get('objective'), payload.currentUserId));
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
    takeLatest(actionTypes.FETCH_OKRS, fetchOkrs),
    takeLatest(actionTypes.FETCH_OBJECTIVE, withLoading(fetchObjective)),
    takeLatest(actionTypes.FETCH_OBJECTIVES, withLoading(fetchObjectives)),
    takeLatest(actionTypes.FETCH_ALL_OBJECTIVES, fetchAllObjectives),
    takeLatest(actionTypes.ADD_OBJECTIVE, withLoading(addObjective)),
    takeLatest(actionTypes.UPDATE_OBJECTIVE, withLoading(updateObjective)),
    takeLatest(actionTypes.REMOVE_OBJECTIVE, withLoading(removeObjective)),
  ]);
}

import { all, put, take, takeLatest, select } from 'redux-saga/effects';
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
  if (payload.withCandidates) {
    const [loginUserId, isAdmin] = yield select(state => [state.loginUser.get('id'), state.loginUser.get('isAdmin')]);
    const userId = isAdmin ? undefined : loginUserId;
    // Objective に紐付く上位 KR の変更のほうがよく行われるとの推測から先に KR を fetch する
    yield put(keyResultActions.fetchKeyResultCandidates(payload.okrPeriodId, userId)); // without loading
    yield take(actionTypes.FETCHED_KEY_RESULT_CANDIDATES)
    yield put(objectiveActions.fetchObjectiveCandidates(payload.okrPeriodId, userId)); // without loading
    yield take(actionTypes.FETCHED_OBJECTIVE_CANDIDATES)
  }
}

function* fetchObjective({ payload }) {
  yield put(objectiveActions.fetchObjectiveAsync(payload.objectiveId, payload.keyResultId));
  yield take([actionTypes.FETCHED_OBJECTIVE, actionTypes.FETCHED_OBJECTIVE_ERROR]);
}

function* fetchObjectiveAsync({ payload }) {
  const { objectiveId, keyResultId } = payload;
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

function* fetchObjectiveCandidates({ payload }) {
  const result = yield call(API.get, '/objectives/candidates', { okrPeriodId: payload.okrPeriodId, userId: payload.userId });
  yield put(objectiveActions.fetchedObjectiveCandidates(result));
}

function* addObjective({ payload }) {
  const url = payload.isCopy ? `/objectives/${payload.objective.id}/copy` : '/objectives'
  const result = yield call(API.post, url, { objective: payload.objective })
  const currentUserId = yield select(state => state.current.get('userId'));
  yield put(objectiveActions.addedObjective(result.get('objective'), payload.isNew, currentUserId));
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
    takeLatest(actionTypes.FETCH_OKRS, fetchOkrs),
    takeLatest(actionTypes.FETCH_OBJECTIVE, withLoading(fetchObjective)),
    takeLatest(actionTypes.FETCH_OBJECTIVE_ASYNC, fetchObjectiveAsync),
    takeLatest(actionTypes.FETCH_OBJECTIVES, withLoading(fetchObjectives)),
    takeLatest(actionTypes.FETCH_OBJECTIVE_CANDIDATES, fetchObjectiveCandidates),
    takeLatest(actionTypes.ADD_OBJECTIVE, withLoading(addObjective)),
    takeLatest(actionTypes.UPDATE_OBJECTIVE, withLoading(updateObjective)),
    takeLatest(actionTypes.REMOVE_OBJECTIVE, withLoading(removeObjective)),
  ]);
}

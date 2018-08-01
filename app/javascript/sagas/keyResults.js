import { all, put, takeLatest, select } from 'redux-saga/effects';
import call from '../utils/call';
import API from '../utils/api';
import keyResultActions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';
import actionTypes from '../constants/actionTypes';
import withLoading from '../utils/withLoading';
import toastActions from '../actions/toasts';

function* fetchKeyResults({payload}) {
  const result = yield call(API.get, '/key_results', { okrPeriodId: payload.okrPeriodId, userId: payload.userId });
  yield put(keyResultActions.fetchedKeyResults(result.get('keyResults')));
}

function* fetchKeyResultCandidates({ payload }) {
  const result = yield call(API.get, '/key_results/candidates', { okrPeriodId: payload.okrPeriodId, userId: payload.userId });
  yield put(keyResultActions.fetchedKeyResultCandidates(result));
}

function* fetchTaskKeyResults({ payload }) {
  const result = yield call(API.get, '/key_results/unprocessed', { okrPeriodId: payload.okrPeriodId, userId: payload.userId })
  yield put(keyResultActions.fetchedTaskKeyResults(result.get('keyResults')))
}

function* addKeyResult({ payload }) {
  const result = yield call(API.post, '/key_results', { keyResult: payload.keyResult });
  const currentUserId = yield select(state => state.current.get('userId'));
  yield put(keyResultActions.addedKeyResult(result.get('keyResult'), currentUserId));
  yield put(dialogActions.closeKeyResultModal());
  yield put(toastActions.showToast('Key Result を作成しました'));
}

function* updateKeyResult({payload}) {
  const { keyResult } = payload
  const result = yield call(API.put, '/key_results/' + keyResult.id, { keyResult });
  const currentUserId = yield select(state => state.current.get('userId'));
  yield put(keyResultActions.updatedKeyResult(result.get('keyResult'), currentUserId));
  if (keyResult.member && keyResult.member.behavior === 'remove') {
    yield put(keyResultActions.removedKeyResultMember(keyResult.id, keyResult.member.user))
  }
  yield put(toastActions.showToast('Key Result を更新しました'));
}

function* removeKeyResult({payload}) {
  const result = yield call(API.delete, '/key_results/' + payload.id);
  yield put(keyResultActions.removedKeyResult(result.get('keyResult')));
  yield put(toastActions.showToast('Key Result を削除しました'));
}

function* processKeyResult({ payload }) {
  yield call(API.put, `/key_results/${payload.id}/process`, {})
  yield put(keyResultActions.processedKeyResult(payload.id))
}

export function *keyResultSagas() {
  yield all([
    takeLatest(actionTypes.FETCH_KEY_RESULTS, fetchKeyResults),
    takeLatest(actionTypes.FETCH_KEY_RESULT_CANDIDATES, fetchKeyResultCandidates),
    takeLatest(actionTypes.FETCH_TASK_KEY_RESULTS, withLoading(fetchTaskKeyResults)),
    takeLatest(actionTypes.ADD_KEY_RESULT, withLoading(addKeyResult)),
    takeLatest(actionTypes.UPDATE_KEY_RESULT, withLoading(updateKeyResult)),
    takeLatest(actionTypes.REMOVE_KEY_RESULT, withLoading(removeKeyResult)),
    takeLatest(actionTypes.PROCESS_KEY_RESULT, withLoading(processKeyResult)),
  ]);
}

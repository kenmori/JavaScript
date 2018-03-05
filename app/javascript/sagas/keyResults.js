import { all, put, takeLatest, call as orgCall } from 'redux-saga/effects';
import call from '../utils/call';
import API from '../utils/api';
import loadingActions from '../actions/loading';
import keyResultActions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';
import actionTypes from '../constants/actionTypes';
import withLoading from '../utils/withLoading';
import toastActions from '../actions/toasts';


function* fetchKeyResult({payload}) {
  yield put(loadingActions.openLoading());
  const result = yield orgCall(API.get, '/key_results/' + payload.id);
  if (result.error) {
    yield put(loadingActions.forceCloseLoadingOn());
    yield put(loadingActions.closeLoading());
    yield put(keyResultActions.fetchedKeyResultError(payload.id));
  } else {
    yield put(loadingActions.closeLoading());
    yield put(keyResultActions.fetchedKeyResult(result.get('keyResult')));
  }
}

function* fetchKeyResults({payload}) {
  const result = yield call(API.get, '/key_results', { okrPeriodId: payload.okrPeriodId, userId: payload.userId });
  yield put(keyResultActions.fetchedKeyResults(result.get('keyResults')));
}

function* fetchAllKeyResults({ payload }) {
  const result = yield call(API.get, '/key_results', { okrPeriodId: payload.okrPeriodId });
  yield put(keyResultActions.fetchedAllKeyResults(result.get('keyResults')));
}

function* addKeyResult({ payload }) {
  const result = yield call(API.post, '/key_results', { keyResult: payload.keyResult });
  yield put(keyResultActions.addedKeyResult(result.get('keyResult'), payload.currentUserId));
  yield put(dialogActions.closeKeyResultModal());
  yield put(toastActions.showToast('Key Result を作成しました'));
}

function* updateKeyResult({payload}) {
  const result = yield call(API.put, '/key_results/' + payload.keyResult.id, { keyResult: payload.keyResult });
  yield put(keyResultActions.updatedKeyResult(result.get('keyResult'), payload.currentUserId));
  yield put(toastActions.showToast('Key Result を更新しました'));
}

function* removeKeyResult({payload}) {
  const result = yield call(API.delete, '/key_results/' + payload.id);
  yield put(keyResultActions.removedKeyResult(result.get('keyResult')));
  yield put(toastActions.showToast('Key Result を削除しました'));
}

export function *keyResultSagas() {
  yield all([
    takeLatest(actionTypes.FETCH_KEY_RESULT, fetchKeyResult),
    takeLatest(actionTypes.FETCH_KEY_RESULTS, fetchKeyResults),
    takeLatest(actionTypes.FETCH_ALL_KEY_RESULTS, fetchAllKeyResults),
    takeLatest(actionTypes.ADD_KEY_RESULT, withLoading(addKeyResult)),
    takeLatest(actionTypes.UPDATE_KEY_RESULT, withLoading(updateKeyResult)),
    takeLatest(actionTypes.REMOVE_KEY_RESULT, withLoading(removeKeyResult)),
  ]);
}

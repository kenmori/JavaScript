import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../utils/api';
import keyResultActions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';
import actionTypes from '../constants/actionTypes';
import withLoading from '../utils/withLoading';

function* fetchKeyResults() {
  const result = yield call(API.get, '/key_results');
  yield put(keyResultActions.fetchedKeyResults(result));
}

function* addKeyResult({ payload }) {
  const result = yield call(API.post, '/key_results', { keyResult: payload.keyResult });
  yield put(keyResultActions.addedKeyResult(result));
  yield put(dialogActions.closeKeyResultFormModal());
}

function* updateKeyResult({payload}) {
  const result = yield call(API.put, '/key_results/' + payload.keyResult.id, payload);
  yield put(keyResultActions.updatedKeyResult(result.get('keyResult')));
}

function* removeKeyResult({payload}) {
  const result = yield call(API.delete, '/key_results/' + payload.keyResult.id, payload);
  yield put(keyResultActions.removedKeyResult(result.get('keyResult')));
}

export function *keyResultSagas() {
  yield all([
    takeLatest(actionTypes.FETCH_KEY_RESULTS, withLoading(fetchKeyResults)),
    takeLatest(actionTypes.ADD_KEY_RESULT, withLoading(addKeyResult)),
    takeLatest(actionTypes.UPDATE_KEY_RESULT, withLoading(updateKeyResult)),
    takeLatest(actionTypes.REMOVE_KEY_RESULT, withLoading(removeKeyResult)),
  ]);
}

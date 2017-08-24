import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../utils/api';
import keyResultActions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';
import actionTypes from '../constants/actionTypes';

function* fetchKeyResults() {
  const result = yield call(API.get, '/key_results');
  yield put(keyResultActions.fetchedKeyResults(result));
}

function* addKeyResult({ payload }) {
  const result = yield call(API.post, '/key_results', { keyResult: payload.keyResult });
  yield put(keyResultActions.addedKeyResult(result));
  if(!payload.isContinue) {
    yield put(dialogActions.closeKeyResultFormModal());
  }
}

function* updateKeyResult({payload}) {
  const result = yield call(API.put, '/key_results/' + payload.keyResult.id, payload);
  console.log('updateKeyResult')
  yield put(keyResultActions.updatedKeyResult(result.get('keyResult')));
}

export function *keyResultSagas() {
  yield all([
    takeLatest(actionTypes.FETCH_KEY_RESULTS, fetchKeyResults),
    takeLatest(actionTypes.ADD_KEY_RESULT, addKeyResult),
    takeLatest(actionTypes.UPDATE_KEY_RESULT, updateKeyResult),
  ]);
}

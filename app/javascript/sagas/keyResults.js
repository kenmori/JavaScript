import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../utils/api';
import keyResultActions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';
import actionTypes from '../constants/actionTypes';
import withLoading from '../utils/withLoading';

function* addKeyResult({ payload }) {
  const result = yield call(API.post, '/key_results', { keyResult: payload });
  yield put(keyResultActions.addedKeyResult(result));
  yield put(dialogActions.closeKeyResultFormModal());
}

function* updateKeyResult({payload}) {
  const result = yield call(API.put, '/key_results/' + payload.id, { keyResult: payload });
  yield put(keyResultActions.updatedKeyResult(result));
}

function* removeKeyResult({payload}) {
  const result = yield call(API.delete, '/key_results/' + payload.id, { keyResult: payload });
  yield put(keyResultActions.removedKeyResult(result));
}

export function *keyResultSagas() {
  yield all([
    takeLatest(actionTypes.ADD_KEY_RESULT, withLoading(addKeyResult)),
    takeLatest(actionTypes.UPDATE_KEY_RESULT, withLoading(updateKeyResult)),
    takeLatest(actionTypes.REMOVE_KEY_RESULT, withLoading(removeKeyResult)),
  ]);
}

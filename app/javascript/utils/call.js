import { put, call, cancel } from 'redux-saga/effects';
import dialogActions from '../actions/dialogs';
import loadingActions from '../actions/loading';

export default function* (...args){
  const response = yield call(...args);
  if (response.error) {
    const message = yield call(() => response.error.response.json().then((item) => item.error));
    yield put(loadingActions.forceCloseLoadingOn());
    yield put(loadingActions.closeLoading());
    yield put(dialogActions.openErrorModal(message));
    yield cancel();
  } 
  return response;
}



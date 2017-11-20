import { put, call, fork } from 'redux-saga/effects';
import loadingActions from '../actions/loading';

const TIME_TO_OPEN_LOADING = 200;
let connecting = null;

function wait(time) {
  return () => (
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    })
  )
}

function* openLoading() {
  yield call(wait(TIME_TO_OPEN_LOADING));

  if (connecting) {
    yield put(loadingActions.openLoading());
  }
}

export default function withLoading(xhrRequest){
  return function* (){
    connecting = true;
    yield fork(openLoading);
    yield xhrRequest(...arguments);
    connecting = false;
    yield put(loadingActions.closeLoading());
  }
}

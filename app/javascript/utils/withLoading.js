import { put, call, fork } from 'redux-saga/effects';
import loadingActions from '../actions/loading';

const TIME_TO_OPEN_LOADING = 200;
let connectingCounter = 0;

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
  if(connectingCounter) {
    yield put(loadingActions.openLoading());  
  }
}

export default function withLoading(xhrRequest){
  return function* (){
    if(++connectingCounter === 1) {
      yield fork(openLoading);  
    }
    yield xhrRequest(...arguments);
    if(--connectingCounter === 0) {
      yield put(loadingActions.closeLoading());
    }
  }
}

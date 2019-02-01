import { put } from "redux-saga/effects";
import loadingActions from "../actions/loading";

let actionCounter = 0;

export default function withLoading(saga) {
  return function* () {
    if (++actionCounter === 1) {
      yield put(loadingActions.openLoading());
    }
    yield saga(...arguments);
    if (--actionCounter === 0) {
      yield put(loadingActions.closeLoading());
    }
  };
}

import { put } from "redux-saga/effects";
import loadingActions from "../actions/loading";

let actionCounter = 0;

export default function withLoading(saga) {
  return function* () {
    if (++actionCounter === 1) {
      yield put(loadingActions.openLoading());
    }
    try {
      yield saga(...arguments);
    } catch (e) {
      // nothing to do
    }
    if (--actionCounter === 0) {
      yield put(loadingActions.closeLoading());
    }
  };
}

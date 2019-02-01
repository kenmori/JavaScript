import { put } from "redux-saga/effects";
import loadingActions from "../actions/loading";

export default function withLoading(saga) {
  return function* () {
    yield put(loadingActions.openLoading());
    try {
      yield saga(...arguments);
    } catch (e) {
      // nothing to do
    }
    yield put(loadingActions.closeLoading());
  };
}

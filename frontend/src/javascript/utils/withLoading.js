import { put } from "redux-saga/effects";
import loadingActions from "../actions/loading";

export default function withLoading(saga) {
  return function* () {
    yield put(loadingActions.openLoading());

    try {
      yield saga(...arguments);
    } catch (e) {
      yield put(loadingActions.closeLoading());
      throw e;
    }

    yield put(loadingActions.closeLoading());
  };
}

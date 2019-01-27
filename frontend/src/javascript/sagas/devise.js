import { all, put, takeLatest } from "redux-saga/effects";
import call from "../utils/call";
import API from "../utils/api";
import actionTypes from "../constants/actionTypes";
import deviseActions from "../actions/devise";
import history from "../utils/history";
import withLoading from "../utils/withLoading";
import {
  transitionAuthenticatedStatus,
  transitionUnAuthenticatedStatus,
} from "../utils/auth";

function* signIn({ payload }) {
  yield call(API.post, "/users/sign_in", { user: payload.user });
  transitionAuthenticatedStatus();

  const location = payload.location;
  if (location) {
    history.push(`${location.from.pathname}${location.from.search}`);
  } else {
    history.push("/");
  }
}

function* signOut() {
  yield call(API.delete, "/users/sign_out");
  transitionUnAuthenticatedStatus();

  location.href = "/login";
}

function* resetPassword({ payload }) {
  yield call(API.post, "/users/password", { user: payload.user });
  yield put(deviseActions.resetPasswordCompleted());
}

function* setPassword({ payload }) {
  const url = payload.user.resetPasswordToken
    ? "/users/password"
    : "/users/confirmation";
  yield call(API.put, url, { user: payload.user });

  location.href = "/login";
}

export function* deviseSagas() {
  yield all([
    takeLatest(actionTypes.SIGN_IN, signIn),
    takeLatest(actionTypes.SIGN_OUT, signOut),
    takeLatest(actionTypes.RESET_PASSWORD, withLoading(resetPassword)),
    takeLatest(actionTypes.SET_PASSWORD, withLoading(setPassword)),
  ]);
}

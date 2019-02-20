import { all, put, takeLatest } from "redux-saga/effects";
import call from "../utils/call";
import API from "../utils/api";
import actionTypes from "../constants/actionTypes";
import appActions from "../actions/apps";
import history from "../utils/history";
import withLoading from "../utils/withLoading";

function* integrateSlack({ payload }) {
  yield call(API.put, "/apps/slack", { code: payload.code });
  yield put(appActions.addedSlackIntegration());
  history.push("/settings/applications");
}

function* segregateSlack() {
  yield call(API.delete, "/apps/slack");
  yield put(appActions.removedSlackIntegration());
}

export function* appSagas() {
  yield all([
    takeLatest(actionTypes.ADD_SLACK_INTEGRATION, integrateSlack),
    takeLatest(
      actionTypes.REMOVE_SLACK_INTEGRATION,
      withLoading(segregateSlack),
    ),
  ]);
}

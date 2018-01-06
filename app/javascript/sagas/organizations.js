import { fromJS } from 'immutable';
import { all, put, takeLatest } from 'redux-saga/effects';
import call from '../utils/call';
import API from '../utils/api';
import withLoading from '../utils/withLoading';
import organizationActions from '../actions/organizations';
import actionTypes from '../constants/actionTypes';

function* fetchOrganization({ payload }) {
  const result = yield call(API.get, '/organizations/' + payload.organization.id);
  yield put(organizationActions.fetchedOrganization(result.get('organization')));
}

function* updateOrganization({ payload }) {
  const result = yield call(API.put, '/organizations/' + payload.organization.id, { organization: payload.organization });
  yield put(organizationActions.updatedOrganization(result.get('organization')));
}

function* updateLogo({ payload }) {
  const result = yield call(API.put, '/organizations/' + payload.organization.id, { organization: payload.organization });
  yield put(organizationActions.updatedLogo(result.get('organization')));
}

export function* organizationSagas() {
  yield all([
    takeLatest(actionTypes.FETCH_ORGANIZATION, withLoading(fetchOrganization)),
    takeLatest(actionTypes.UPDATE_ORGANIZATION, withLoading(updateOrganization)),
    takeLatest(actionTypes.UPDATE_LOGO, withLoading(updateLogo)),
  ]);
}

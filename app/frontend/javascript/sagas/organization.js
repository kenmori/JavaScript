import { all, put, takeLatest } from 'redux-saga/effects'
import call from '../utils/call'
import API from '../utils/api'
import withLoading from '../utils/withLoading'
import organizationActions from '../actions/organization'
import actionTypes from '../constants/actionTypes'
import toastActions from '../actions/toasts'
import dialogActions from '../actions/dialogs'

function* fetchOrganization({ payload }) {
  const result = yield call(API.get, '/organizations/' + payload.id)
  yield put(organizationActions.fetchedOrganization(result.get('organization')))
}

function* addOrganization({ payload: { organization, user, okrPeriod } }) {
  const result = yield call(API.post, '/organizations/', { organization, user, okrPeriod })
  yield put(organizationActions.addedOrganization(result.get('organization')))
}

function* updateOrganization({ payload: { organization } }) {
  const result = yield call(API.put, '/organizations/' + organization.id, { organization })
  yield put(organizationActions.updatedOrganization(result.get('organization')))

  if (organization.logo || organization.removeLogo) {
    // ロゴ更新時はトーストを表示しない
    if (organization.logo) {
      yield put(dialogActions.closeImageModal())
    }
  } else {
    yield put(toastActions.showToast('組織情報を更新しました'))
  }
}

function* updateOrganizationOwner({ payload }) {
  const params = { organizationMember: { user: payload.userId } }
  const result = yield call(API.put, `/organizations/${payload.organizationId}/owner`, params)
  yield put(organizationActions.updatedOrganizationOwner(result.get('ownerId')))
  yield put(toastActions.showToast('組織の代表者を変更しました'))
}

export function* organizationSagas() {
  yield all([
    takeLatest(actionTypes.FETCH_ORGANIZATION, withLoading(fetchOrganization)),
    takeLatest(actionTypes.ADD_ORGANIZATION, withLoading(addOrganization)),
    takeLatest(actionTypes.UPDATE_ORGANIZATION, withLoading(updateOrganization)),
    takeLatest(actionTypes.UPDATE_ORGANIZATION_OWNER, withLoading(updateOrganizationOwner)),
  ])
}

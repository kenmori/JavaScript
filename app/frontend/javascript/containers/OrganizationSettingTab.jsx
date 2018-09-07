import OrganizationSettingTab from '../components/setting/OrganizationSettingTab'
import { connect } from 'react-redux'
import dialogActions from '../actions/dialogs'
import organizationActions from '../actions/organization'

const mapStateToProps = (state) => {
  return {
    organization: state.organization.get('current'),
    okrPeriods: state.okrPeriods,
    okrPeriodId: state.current.get('okrPeriodId'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateOrganization: (organization) => {
      dispatch(organizationActions.updateOrganization(organization))
    },
    openImageModal: (id, data) => {
      dispatch(dialogActions.openImageModal(id, data, 'logo'))
    },
    deleteLogo: id => {
      dispatch(organizationActions.updateOrganization({ id, removeLogo: true }))
    },
    confirm: params => {
      dispatch(dialogActions.openConfirmModal(params))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationSettingTab)

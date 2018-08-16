import OrganizationSettingTab from '../components/setting/OrganizationSettingTab';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';
import organizationActions from '../actions/organizations';

const mapStateToProps = (state) => {
  return {
    organization: state.organizations.get('selected'),
    okrPeriods: state.okrPeriods,
    okrPeriodId: state.current.get('okrPeriodId'),
    isExporting: state.organizations.get('isExporting'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateOrganization: (organization) => {
      dispatch(organizationActions.updateOrganization(organization));
    },
    openLogoModal: (targetId, imageData) => {
      dispatch(dialogActions.openLogoModal(targetId, imageData));
    },
    deleteLogo: id => {
      dispatch(organizationActions.updateOrganization({ id, removeLogo: true }));
    },
    exportOkrs: (organization, okrPeriod) => {
      dispatch(organizationActions.exportOkrs(organization.get('id'), okrPeriod.get('id')))
    },
    confirm: params => {
      dispatch(dialogActions.openConfirmModal(params));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationSettingTab);
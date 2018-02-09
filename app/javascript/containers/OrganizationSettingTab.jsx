import OrganizationSettingTab from '../components/setting/OrganizationSettingTab';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';
import organizationActions from '../actions/organizations';
import confirmActions from '../actions/confirm';

const mapStateToProps = (state) => {
  return {
    organization: state.organizations.get('selected')
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
    deleteLogo: (organization) => {
      dispatch(organizationActions.updateLogo(organization));
    },
    confirm: confirmParams => {
      dispatch(confirmActions.openConfirm(confirmParams));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationSettingTab);
import OrganizationSettingTab from '../components/OrganizationSettingTab';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';
import organizationActions from '../actions/organizations';

const mapStateToProps = (state) => {
  return {
    organization: state.organizations.get('selected')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateOrganization: () => {

    },
    openLogoImageModal: (targetId, imageData) => {
      dispatch(dialogActions.openLogoImageModal(targetId, imageData));
    },
    deleteLogo: (organization) => {
      dispatch(organizationActions.updateLogo(organization));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationSettingTab);
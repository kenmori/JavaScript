import OrganizationSettingTab from '../components/OrganizationSettingTab';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    user: state.loginUser,
    organization: state.organizations.get('selected')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateOrganization: () => {

    },
    openLogoImageModal: (targetId, imageData) => {
      dispatch(dialogActions.openAvatarImageModal(targetId, imageData));
    },
    deleteAvatar: (user) => {
      dispatch(userActions.updateAvatar(user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationSettingTab);
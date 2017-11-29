import AccountSettingTab from '../components/AccountSettingTab';
import { connect } from 'react-redux';
import userActions from '../actions/users';
import sessionActions from '../actions/sessions';
import organizationActions from '../actions/organizations';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    user: state.loginUser,
    organization: state.organization,
    isLogout: state.signUp.get('isLogout'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => {
      dispatch(userActions.updateUser(user));
    },
    updateEmail: user => {
      dispatch(userActions.updateEmail(user));
    },
    updatePassword: user => {
      dispatch(userActions.updatePassword(user));
    },
    updateOrganization: organization => {
      dispatch(organizationActions.updateOrganization(organization));
    },
    openAvatarImageModal: imageData => {
      dispatch(dialogActions.openAvatarImageModal(imageData));
    },
    deleteAvatar: user => {
      dispatch(userActions.updateAvatar(user));
    },
    signOut: user => {
      dispatch(sessionActions.signOut());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettingTab);

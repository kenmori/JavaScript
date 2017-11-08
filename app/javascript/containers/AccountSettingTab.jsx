import AccountSettingTab from '../components/AccountSettingTab';
import { connect } from 'react-redux';
import userActions from '../actions/users';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    user: gon.login_user,
    avatarPath: state.loginUser.get('avatarPath')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePassword: user => {
      dispatch(userActions.updatePassword(user));
    },
    openAvatarImageModal: imageData => {
      dispatch(dialogActions.openAvatarImageModal(imageData));
    },
    closeAvatarImageModal: imageData => {
      dispatch(dialogActions.closeAvatarImageModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettingTab);

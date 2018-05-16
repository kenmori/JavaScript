import AccountSettingTab from '../components/setting/AccountSettingTab';
import { connect } from 'react-redux';
import userActions from '../actions/users';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser,
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
    openAvatarModal: (targetId, imageData) => {
      dispatch(dialogActions.openAvatarModal(targetId, imageData));
    },
    deleteAvatar: user => {
      dispatch(userActions.updateAvatar(user));
    },
    confirm: params => {
      dispatch(dialogActions.openConfirmModal(params));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettingTab);
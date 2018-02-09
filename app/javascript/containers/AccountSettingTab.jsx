import AccountSettingTab from '../components/setting/AccountSettingTab';
import { connect } from 'react-redux';
import userActions from '../actions/users';
import dialogActions from '../actions/dialogs';
import confirmActions from '../actions/confirm';

const mapStateToProps = (state) => {
  return {
    user: state.loginUser,
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
    confirm: confirmParams => {
      dispatch(confirmActions.openConfirm(confirmParams));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettingTab);

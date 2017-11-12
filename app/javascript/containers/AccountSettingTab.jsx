import AccountSettingTab from '../components/AccountSettingTab';
import { connect } from 'react-redux';
import userActions from '../actions/users';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    user: state.loginUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePassword: user => {
      dispatch(userActions.updatePassword(user));
    },
    openAvatarImageModal: imageData => {
      dispatch(dialogActions.openAvatarImageModal(imageData));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettingTab);

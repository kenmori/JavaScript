import UserSettingTab from '../components/setting/UserSettingTab';
import { connect } from 'react-redux';
import userActions from '../actions/users';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    loginUserId: state.loginUser.get('id'),
    organization: state.organizations.get('selected'),
    users: state.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addUser: user => {
      dispatch(userActions.addUser(user));
    },
    updateUser: user => {
      dispatch(userActions.updateUser(user));
    },
    updateEmail: user => {
      dispatch(userActions.updateEmail(user));
    },
    removeUser: id => {
      dispatch(userActions.removeUser(id));
    },
    restoreUser: id => {
      dispatch(userActions.restoreUser(id));
    },
    resendEmail: id => {
      dispatch(userActions.resendEmail(id));
    },
    confirm: params => {
      dispatch(dialogActions.openConfirmModal(params));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSettingTab);
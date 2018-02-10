import UserSettingTab from '../components/setting/UserSettingTab';
import { connect } from 'react-redux';
import userActions from '../actions/users';
import confirmActions from '../actions/confirm';

const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser,
    organization: state.organizations.get('selected'),
    users: state.users,
    disabledUsers: state.disabledUsers,
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
    confirm: confirmParams => {
      dispatch(confirmActions.openConfirm(confirmParams));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSettingTab);
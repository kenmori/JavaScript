import UserSettingTab from '../components/UserSettingTab';
import { connect } from 'react-redux';
import userActions from '../actions/users';

const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser,
    users: state.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => {
      dispatch(userActions.fetchUsers());
    },
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSettingTab);
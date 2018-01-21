import UserSettingTab from '../components/UserSettingTab';
import { connect } from 'react-redux';
import userActions from '../actions/users';
import organizationActions from '../actions/organizations';
import confirmActions from '../actions/confirm';

const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser,
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
    confirm: confirmParams => {
      dispatch(confirmActions.openConfirm(confirmParams));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSettingTab);
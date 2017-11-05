import PasswordEditPage from '../components/PasswordEditPage';
import { connect } from 'react-redux';
import usersActions from '../actions/users';

const mapStateToProps = (state) => {
  return {
    passwordEditedPath: '/users/password/edit/completed',
    isRecoverd: state.password.get('isEdited'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editPassword(password, resetPasswordToken) {
      dispatch(usersActions.editPassword({password, resetPasswordToken}));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordEditPage);
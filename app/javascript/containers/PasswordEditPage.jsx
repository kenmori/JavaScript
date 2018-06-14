import PasswordEditPage from '../components/signin/PasswordEditPage';
import { connect } from 'react-redux';
import usersActions from '../actions/users';

const mapStateToProps = (state, { location }) => {
  return {
    token: location.search.split('reset_password_token=')[1].split('=')[0],
    passwordEditedPath: '/users/password/edit/completed',
    isEdited: state.password.get('isEdited'),
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
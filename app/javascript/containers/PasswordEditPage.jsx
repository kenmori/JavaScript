import PasswordEditPage from '../components/signin/PasswordEditPage';
import { connect } from 'react-redux';
import usersActions from '../actions/users';
import dialogActions from '../actions/dialogs'
import queryString from 'query-string'

const mapStateToProps = (state, { location }) => {
  return {
    token: queryString.parse(location.search).reset_password_token,
    passwordEditedPath: '/users/password/edit/completed',
    isEdited: state.password.get('isEdited'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editPassword(password, resetPasswordToken) {
      dispatch(usersActions.editPassword({password, resetPasswordToken}));
    },
    error: params => {
      dispatch(dialogActions.openErrorModal(params))
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordEditPage);
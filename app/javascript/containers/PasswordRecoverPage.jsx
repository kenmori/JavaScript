import PasswordRecoverPage from '../components/signin/PasswordRecoverPage';
import { connect } from 'react-redux';
import usersActions from '../actions/users'

const mapStateToProps = (state) => {
  return {
    passwordRecoverdPath: '/users/password/recover/completed',
    isRecoverd: state.password.get('isRecoverd'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    send(email) {
      dispatch(usersActions.recoverPassword({email}));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordRecoverPage);
import PasswordRecoverPage from '../components/signin/PasswordRecoverPage';
import { connect } from 'react-redux';
import usersActions from '../actions/users'

const mapStateToProps = (state, { location }) => {
  return {
    email: location.state && location.state.email,
    passwordRecoveredPath: '/users/password/recover/completed',
    isRecovered: state.password.get('isRecovered'),
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
import PasswordResetPage from '../components/signin/PasswordResetPage';
import { connect } from 'react-redux';
import usersActions from '../actions/users'

const mapStateToProps = (state, { location }) => {
  return {
    email: location.state && location.state.email,
    isCompleted: state.devise.get('isResetPasswordCompleted'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendEmail(email) {
      dispatch(usersActions.resetPassword({email}));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetPage);
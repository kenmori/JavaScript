import SignInPage from '../components/SignInPage';
import { connect } from 'react-redux';
import sessionActions from '../actions/sessions';

const mapStateToProps = (_state) => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: (email, password, rememberMe) => {
      dispatch(sessionActions.signIn(email, password, rememberMe));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInPage);

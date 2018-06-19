import SignInPage from '../components/signin/SignInPage';
import { connect } from 'react-redux';
import deviseActions from '../actions/devise';

const mapStateToProps = (_state) => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: (email, password) => {
      dispatch(deviseActions.signIn({ email, password, rememberMe: true }))
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInPage);

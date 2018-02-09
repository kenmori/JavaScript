import { connect } from 'react-redux';
import SignUpPage from '../components/signin/SignUpPage';
import usersActions from '../actions/users';

const mapStateToProps = (state) => {
  return {
    signUpCompleted: '/users/sign_up/completed',
    isCompleted: state.signUp.get('isCompleted'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addUser(userData) {
      dispatch(usersActions.addUser(userData));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpPage);

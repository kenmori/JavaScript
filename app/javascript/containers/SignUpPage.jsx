import { connect } from 'react-redux';
import SignUpPage from '../components/SignUpPage';
import usersActions from '../actions/users';

const mapStateToProps = (_state) => {
  return {
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

import PasswordRecoverPage from '../components/PasswordRecoverPage';
import { connect } from 'react-redux';
import usersActions from '../actions/users'

const mapStateToProps = (state) => {
  return {
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
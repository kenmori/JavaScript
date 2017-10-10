import MenuBar from '../components/MenuBar';
import { connect } from 'react-redux';
import userActions from '../actions/users';
import sessionActions from '../actions/sessions';

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => {
      dispatch(userActions.fetchUsers());
    },
    signOut: () => {
      dispatch(sessionActions.signOut());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar);

import UserSettingPage from '../components/UserSettingPage';
import { connect } from 'react-redux';
import userActions from '../actions/users';

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => {
      dispatch(userActions.fetchUsers());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSettingPage);
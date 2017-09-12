import AccountSettingTab from '../components/AccountSettingTab';
import { connect } from 'react-redux';
import userActions from '../actions/users';

const mapStateToProps = (state) => {
  return {
    user: state.users.get(0)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: id => {
      dispatch(userActions.fetchUser(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettingTab);
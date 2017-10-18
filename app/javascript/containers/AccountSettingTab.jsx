import AccountSettingTab from '../components/AccountSettingTab';
import { connect } from 'react-redux';
import userActions from '../actions/users';

const mapStateToProps = (state) => {
  return {
    user: gon.login_user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePassword: user => {
      dispatch(userActions.updatePassword(user));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettingTab);

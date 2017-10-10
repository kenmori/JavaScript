import AccountSettingTab from '../components/AccountSettingTab';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    user: gon.login_user
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettingTab);

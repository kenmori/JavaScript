import OKRSettingTab from '../components/OKRSettingTab';
import { connect } from 'react-redux';
import settingActions from '../actions/settings';

const mapStateToProps = (state) => {
  return {
    okrSetting: state.settings.okr
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOkrSetting: organizationId => {
      dispatch(settingActions.fetchOkrSetting(organizationId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OKRSettingTab);
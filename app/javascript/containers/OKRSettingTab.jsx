import OKRSettingTab from '../components/OKRSettingTab';
import { connect } from 'react-redux';
import settingActions from '../actions/okrSettings';

const mapStateToProps = (state) => {
  return {
    okrSettings: state.okrSettings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOkrSettings: organizationId => {
      dispatch(settingActions.fetchOkrSettings(organizationId));
    },
    updateOkrSettings: (organizationId, okrSettings) => {
      dispatch(settingActions.updateOkrSettings(organizationId, okrSettings));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OKRSettingTab);
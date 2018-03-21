import OkrPeriodSettingTab from '../components/setting/OkrPeriodSettingTab';
import { connect } from 'react-redux';
import okrPeriodActions from '../actions/okrPeriods';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    organizationId: state.organizations.get('selected').get('id'),
    okrSpan: state.organizations.get('selected').get('okrSpan'),
    okrPeriods: state.okrPeriods,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addOkrPeriod: okrPeriod => {
      dispatch(okrPeriodActions.addOkrPeriod(okrPeriod));
    },
    updateOkrPeriod: okrPeriod => {
      dispatch(okrPeriodActions.updateOkrPeriod(okrPeriod));
    },
    removeOkrPeriod: okrPeriod => {
      dispatch(okrPeriodActions.removeOkrPeriod(okrPeriod));
    },
    confirm: params => {
      dispatch(dialogActions.openConfirmModal(params));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrPeriodSettingTab);
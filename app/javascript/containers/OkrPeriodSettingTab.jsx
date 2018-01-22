import OkrPeriodSettingTab from '../components/OkrPeriodSettingTab';
import { connect } from 'react-redux';
import okrPeriodActions from '../actions/okrPeriods';
import confirmActions from '../actions/confirm';

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
    confirm: confirmParams => {
      dispatch(confirmActions.openConfirm(confirmParams));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrPeriodSettingTab);
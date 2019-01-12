import { connect } from "react-redux";
import OkrPeriodSettingTab from "../components/setting/OkrPeriodSettingTab";
import okrPeriodActions from "../actions/okrPeriods";
import dialogActions from "../actions/dialogs";

const mapStateToProps = state => ({
  okrPeriods: state.okrPeriods,
  okrPeriodId: state.current.get("okrPeriodId"),
});

const mapDispatchToProps = dispatch => ({
  updateOkrPeriod: okrPeriod => {
    dispatch(okrPeriodActions.updateOkrPeriod(okrPeriod));
  },
  removeOkrPeriod: okrPeriod => {
    dispatch(okrPeriodActions.removeOkrPeriod(okrPeriod));
  },
  confirm: params => {
    dispatch(dialogActions.openConfirmModal(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OkrPeriodSettingTab);

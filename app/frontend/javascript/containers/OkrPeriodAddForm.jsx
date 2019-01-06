import { connect } from "react-redux";
import OkrPeriodAddForm from "../components/setting/OkrPeriodAddForm";
import okrPeriodActions from "../actions/okrPeriods";

const mapStateToProps = state => {
  const organization = state.organization.get("current");
  return {
    organizationId: organization.get("id"),
    okrSpan: organization.get("okrSpan"),
    okrPeriods: state.okrPeriods,
  };
};

const mapDispatchToProps = dispatch => ({
  addOkrPeriod: okrPeriod => {
    dispatch(okrPeriodActions.addOkrPeriod(okrPeriod));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OkrPeriodAddForm);

import OkrPeriodSettingTab from '../components/OkrPeriodSettingTab';
import { connect } from 'react-redux';
import organizationActions from '../actions/organizations';
import { denormalizeObjectives } from "../schemas";

const mapStateToProps = (state) => {
  return {
    okrPeriods: state.okrPeriods,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addOkrPeriod: okrPeriod => {
    },
    updateOkrPeriod: okrPeriod => {
    },
    removeOkrPeriod: okrPeriod => {
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrPeriodSettingTab);
import OkrPeriodSettingTab from '../components/OkrPeriodSettingTab';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import { denormalizeObjectives } from "../schemas";

const mapStateToProps = (state) => {
  const denormalizedObjectives = denormalizeObjectives(state);
  return {
    loginUser: state.loginUser,
    objectives: denormalizedObjectives,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchObjectives: (id) => {
      dispatch(objectiveActions.fetchObjectives(null, id));
    },
    addObjective: user => {
    },
    updateObjective: user => {
    },
    removeObjective: id => {
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrPeriodSettingTab);
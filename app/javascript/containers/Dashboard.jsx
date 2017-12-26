import Dashboard from '../components/Dashboard';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import { denormalizeObjectives } from "../schemas";

const mapStateToProps = (state) => {
  const denormalizedObjectives = denormalizeObjectives(state);
  return {
    menu: state.menu,
    objectives: denormalizedObjectives,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchObjectives: (okrPeriodId, userId) => {
      dispatch(objectiveActions.fetchObjectives(okrPeriodId, userId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

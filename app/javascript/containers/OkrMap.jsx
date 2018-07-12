import OkrMap from '../components/map/OkrMap';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import { getSelectedObjective } from '../utils/selector'

const mapStateToProps = state => {
  return {
    objective: getSelectedObjective(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchObjective: objectiveId => {
      dispatch(objectiveActions.fetchObjective(objectiveId));
    },
    fetchObjectiveByKeyResult: keyResultId => {
      dispatch(objectiveActions.fetchObjective(null, keyResultId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrMap);

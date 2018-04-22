import KeyResultList from '../components/dashboard/KeyResultList';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import currentActions from '../actions/current';

const mapStateToProps = (state) => {
  return {
    currentKeyResultId: state.keyResults.get('selectedId'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchObjective: id => {
      dispatch(objectiveActions.fetchObjective(id));
    },
    changeCurrentOkr: (objectiveId, keyResultId) => {
      dispatch(currentActions.changeCurrentOkr(objectiveId, keyResultId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyResultList);

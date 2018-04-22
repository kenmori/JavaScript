import KeyResultList from '../components/dashboard/KeyResultList';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';

const mapStateToProps = (state) => {
  return {
    selectedKeyResultId: state.objectives.getIn(['selectedOkr', 'keyResultId']),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchObjective: id => {
      dispatch(objectiveActions.fetchObjective(id));
    },
    selectOkr: (objectiveId, keyResultId) => {
      dispatch(objectiveActions.selectOkr(objectiveId, keyResultId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyResultList);

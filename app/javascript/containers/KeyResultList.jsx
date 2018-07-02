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
    selectKeyResult: keyResult => {
      dispatch(objectiveActions.selectOkr(keyResult.get('objectiveId'), keyResult.get('id')))
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyResultList);

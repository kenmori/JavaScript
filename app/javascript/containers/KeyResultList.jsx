import KeyResultList from '../components/dashboard/KeyResultList';
import { connect } from 'react-redux';
import currentActions from '../actions/current';

const mapStateToProps = (state) => {
  return {
    selectedKeyResultId: state.current.getIn(['selectedOkr', 'keyResultId']),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectKeyResult: keyResult => {
      dispatch(currentActions.selectOkr(keyResult.get('objectiveId'), keyResult.get('id')))
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyResultList);

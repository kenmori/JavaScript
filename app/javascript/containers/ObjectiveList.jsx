import ObjectiveList from '../components/dashboard/ObjectiveList';
import { connect } from 'react-redux';
import currentActions from '../actions/current';

const mapStateToProps = (state) => {
  return {
    currentObjectiveId: state.objectives.get('selectedId'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCurrentOkr: objectiveId => {
      dispatch(currentActions.changeCurrentOkr(objectiveId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ObjectiveList);

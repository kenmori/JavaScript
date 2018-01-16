import ObjectiveList from '../components/ObjectiveList';
import { connect } from 'react-redux';
import currentActions from '../actions/current';

const mapStateToProps = (state) => {
  return {
    currentObjectiveId: state.current.get('objectiveId'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCurrentObjective: id => {
      dispatch(currentActions.changeCurrentObjective(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ObjectiveList);

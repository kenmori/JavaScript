import ObjectiveList from '../components/dashboard/ObjectiveList';
import { connect } from 'react-redux';
import currentActions from '../actions/current';
import loginUserActions from '../actions/loginUser';

const mapStateToProps = (state) => {
  return {
    selectedObjectiveId: state.current.getIn(['selectedOkr', 'objectiveId']),
    objectiveOrder: state.objectives.get('ids'),
    canMoveObjective: state.loginUser.get('id') === state.current.get('userIdAtFetchedObjectives'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectObjective: objective => {
      dispatch(currentActions.selectOkr(objective.get('id')))
    },
    updateObjectiveOrder: order => {
      dispatch(loginUserActions.updateObjectiveOrder(order))
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ObjectiveList);

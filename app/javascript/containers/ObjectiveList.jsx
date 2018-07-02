import ObjectiveList from '../components/dashboard/ObjectiveList';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import objectiveOrderActions from '../actions/objectiveOrders';

const mapStateToProps = (state) => {
  return {
    selectedObjectiveId: state.objectives.getIn(['selectedOkr', 'objectiveId']),
    objectiveOrder: state.objectives.get('ids'),
    canMoveObjective: state.loginUser.get('id') === state.current.get('userIdAtFetchedObjectives'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectObjective: objective => {
      dispatch(objectiveActions.selectOkr(objective.get('id')))
    },
    updateObjectiveOrder: order => {
      dispatch(objectiveOrderActions.updateObjectiveOrder(order))
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ObjectiveList);

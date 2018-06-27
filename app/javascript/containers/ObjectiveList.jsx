import ObjectiveList from '../components/dashboard/ObjectiveList';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import objectiveOrderActions from '../actions/objectiveOrders';
import { canMoveObjective } from "../utils/selector";

const mapStateToProps = (state) => {
  return {
    selectedObjectiveId: state.objectives.getIn(['selectedOkr', 'objectiveId']),
    objectiveOrder: state.objectives.get('ids'),
    canMoveObjective: canMoveObjective(state),
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

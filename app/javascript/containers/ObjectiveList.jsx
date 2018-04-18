import ObjectiveList from '../components/dashboard/ObjectiveList';
import { connect } from 'react-redux';
import currentActions from '../actions/current';
import userActions from '../actions/users';
import { canMoveObjective } from "../utils/okr";

const mapStateToProps = (state) => {
  return {
    currentObjectiveId: state.objectives.get('selectedId'),
    objectiveOrder: state.objectives.get('ids'),
    canMoveObjective: canMoveObjective(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCurrentOkr: objectiveId => {
      dispatch(currentActions.changeCurrentOkr(objectiveId));
    },
    updateObjectiveOrder: user => {
      dispatch(userActions.updateUser(user, false))
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ObjectiveList);

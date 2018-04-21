import ObjectiveList from '../components/dashboard/ObjectiveList';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import userActions from '../actions/users';
import { canMoveObjective } from "../utils/okr";

const mapStateToProps = (state) => {
  return {
    selectedObjectiveId: state.objectives.getIn(['selectedOkr', 'objectiveId']),
    objectiveOrder: state.objectives.get('ids'),
    canMoveObjective: canMoveObjective(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectOkr: objectiveId => {
      dispatch(objectiveActions.selectOkr(objectiveId));
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

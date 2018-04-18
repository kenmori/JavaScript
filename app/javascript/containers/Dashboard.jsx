import Dashboard from '../components/dashboard/Dashboard';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';
import userActions from '../actions/users';
import { denormalizeObjective, denormalizeObjectives, denormalizeKeyResults } from "../schemas";
import { canMoveObjective } from "../utils/okr";

const mapStateToProps = state => {
  return {
    okrPeriodId: state.current.get('okrPeriodId'),
    userId: state.current.get('userId'),
    canMoveObjective: canMoveObjective(state),
    mapObjective: denormalizeObjective(state.objectives.get('selectedId'), state.entities),
    objectives: denormalizeObjectives(state.objectives.get('ids'), state.entities),
    keyResults: denormalizeKeyResults(state.keyResults.get('ids'), state.entities),
    isFetchedObjective: state.objectives.get('isFetchedObjective'),
    isFetchedObjectives: state.objectives.get('isFetchedObjectives'),
    isAdmin: state.loginUser.get('isAdmin'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOkrs: (okrPeriodId, userId, withAll) => {
      dispatch(objectiveActions.fetchOkrs(okrPeriodId, userId, withAll));
    },
    openObjectiveModal: () => {
      dispatch(dialogActions.openObjectiveModal());
    },
    updateObjectiveOrder: (user) => {
      dispatch(userActions.updateUser(user, false))
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

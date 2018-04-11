import Dashboard from '../components/dashboard/Dashboard';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';
import currentActions from '../actions/current';
import userActions from '../actions/users';
import { denormalizeObjective, denormalizeObjectives, denormalizeKeyResults } from "../schemas";
import { canMoveObjective } from "../utils/okr";

const mapStateToProps = state => {
  const objectiveIds = state.objectives.get('ids');
  const fetchedObjectiveId = state.objectives.get('fetchedObjective');
  return {
    okrPeriodId: state.current.get('okrPeriodId'),
    userId: state.current.get('userId'),
    canMoveObjective: canMoveObjective(state),
    objectiveIds: objectiveIds,
    objectives: denormalizeObjectives(objectiveIds, state.entities),
    keyResults: denormalizeKeyResults(state.keyResults.get('ids'), state.entities),
    isFetchedObjectives: state.objectives.get('isFetchedObjectives'),
    fetchedObjectiveId,
    fetchedObjective: fetchedObjectiveId && denormalizeObjective(fetchedObjectiveId, state.entities),
    entities: state.entities,
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
    changeCurrentOkr: objectiveId => {
      dispatch(currentActions.changeCurrentOkr(objectiveId));
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
